import { showModificableAlert } from "@/utils/alerts";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function CantidadModal({ isOpen, onClose, producto, tipo }) {
    const [cantidad, setCantidad] = useState("");

    if (!isOpen) return null;

    const esVenta = tipo === "venta";
    const titulo = esVenta ? "¿Cuántas unidades has vendido?" : "¿Has recibido el pedido?";
    const botonTexto = esVenta ? "Registrar venta" : "Registrar recepción";
    const botonColor = esVenta ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700";

    if (producto.estado) {
        showModificableAlert('Pedido ya recibido', `El producto ${producto.nombre} ya ha sido marcado como recibido.`, 'error');
        onClose();
        return;
    }

    const [formData, setFormData] = useState({        
        codigo: "",
        nombre: "",
        precio_unitario: "",
        cantidad_vendida: "",
        id_almacen: "",

        nombre_cliente: "",
        identificacion_cliente: "",
        telefono_cliente: "",
        email_cliente: "",
        direccion_cliente: "",
        tipo_comprador: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const datos = {
            ...producto,
            cantidad: cantidad,
        };

        console.log(producto);

        if (esVenta){

            router.post(route("ventas.store"), formData, {
                onSuccess: () => {
                    showModificableAlert(
                        "Producto vendido",
                        `El producto "${producto.nombre}" se ha marcado como vendido"`,
                        "success"
                    );
                    setCantidad("");
                    onClose();
                    router.visit(route("ventas.index"), {
                        preserveScroll: true,
                    });
                },
                onError: (errors) => {
                    showModificableAlert(
                        "Error al vender el producto",
                        `Detalles: ${JSON.stringify(errors)}`,
                        "error"
                    );
                },
            });

        } else {
            router.post(route("pedidos.addInventario"), datos, {
                onSuccess: () => {
                    showModificableAlert(
                        "Pedido registrado",
                        "Se actualizó correctamente el inventario.",
                        "success"
                    );
                    setCantidad("");
                    onClose();
                    router.visit(route("inventario.index"), {
                        preserveScroll: true,
                    });
                },
                onError: (errors) => {
                    showModificableAlert(
                        "Error al registrar",
                        `Detalles: ${JSON.stringify(errors)}`,
                        "error"
                    );
                },
            });
        }

    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{titulo}</h2>

                <div className="mb-2 text-gray-700">
                    Producto: <span className="font-semibold">{producto?.nombre}</span>
                </div>
                <div className="mb-4 text-gray-700">
                    Cantidad en inventario: <span className="font-semibold">{producto?.cantidad_actual}</span>
                </div>

                <form onSubmit={handleSubmit}>

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
