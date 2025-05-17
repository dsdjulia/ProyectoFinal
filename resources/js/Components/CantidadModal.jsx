import { showModificableAlert } from "@/utils/alerts";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function CantidadModal({ isOpen, onClose, producto, tipo }) {
    const [cantidad, setCantidad] = useState("");

    if (!isOpen) return null;

    const esVenta = tipo === "venta";
    const titulo = esVenta
        ? "¿Cuántas unidades has vendido?"
        : "¿Has recibido el pedido?";
    const botonTexto = esVenta ? "Registrar venta" : "Registrar recepción";
    const botonColor = esVenta
        ? "bg-green-600 hover:bg-green-700"
        : "bg-slate-400 hover:bg-slate-700";

    if (producto.estado) {
        showModificableAlert(
            "Pedido ya recibido",
            `El producto ${producto.nombre} ya ha sido marcado como recibido.`,
            "error"
        );
        onClose();
        return;
    }

    // const [formData, setFormData] = useState({
    //     codigo: "",
    //     nombre: "",
    //     precio_unitario: "",
    //     id_almacen: "",
    //     cantidad_vendida: "",
    //     nombre_cliente: "",
    //     identificacion_cliente: "",
    //     telefono_cliente: "",
    //     email_cliente: "",
    //     direccion_cliente: "",
    //     tipo_comprador: "",
    // });

   const handleSubmit = (e) => {
    e.preventDefault();

    const cantidadNum = parseInt(cantidad, 10);

    if (isNaN(cantidadNum)) {
        showModificableAlert(
            "Cantidad inválida",
            "Por favor ingresa un número válido.",
            "error"
        );
        return;
    }

    if (cantidadNum <= 0) {
        showModificableAlert(
            "Cantidad inválida",
            "La cantidad debe ser mayor que cero.",
            "error"
        );
        return;
    }

    if (esVenta && cantidadNum > producto.cantidad_actual) {
        showModificableAlert(
            "Cantidad inválida",
            `La cantidad debe estar entre 1 y ${producto.cantidad_actual}.`,
            "error"
        );
        return;
    }

    const datos = {
        ...producto,
        cantidad: cantidadNum,
    };

    const ruta = esVenta ? route("ventas.store") : route("pedidos.addInventario");
    const redirect = esVenta ? "ventas.index" : "inventario.index";
    const successMsg = esVenta
        ? `El producto "${producto.nombre}" se ha marcado como vendido`
        : "Se actualizó correctamente el inventario.";
    const tituloSuccess = esVenta ? "Producto vendido" : "Pedido registrado";
    const tituloError = esVenta
        ? "Error al vender el producto"
        : "Error al registrar";

    router.post(ruta, datos, {
        onSuccess: () => {
            showModificableAlert(tituloSuccess, successMsg, "success");
            setCantidad("");
            onClose();
            router.visit(route(redirect), {
                preserveScroll: true,
            });
        },
        onError: (errors) => {
            showModificableAlert(
                tituloError,
                `Detalles: ${JSON.stringify(errors)}`,
                "error"
            );
        },
    });
};



    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{titulo}</h2>

                <div className="mb-2 text-gray-700">
                    Producto: <span className="font-semibold">{producto?.nombre}</span>
                </div>
                <div className="mb-4 text-gray-700">
                    Cantidad en inventario: <span className="font-semibold">{producto?.cantidad_actual||"0"}</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Cantidad</label>
                        <input
                            type="number"
                            min="1"
                            max={producto.cantidad_actual }
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ingrese cantidad"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setCantidad("");
                                onClose();
                            }}
                            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-md text-white ${botonColor} transition`}
                        >
                            {botonTexto}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
