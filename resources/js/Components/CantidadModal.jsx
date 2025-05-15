import { showModificableAlert } from "@/utils/alerts";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function CantidadModal({ isOpen, onClose, producto, tipo }) {
    const [cantidad, setCantidad] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const datos = {
            ...producto,
            cantidad: cantidad,
        };

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
    };

    if (!isOpen) return null;

    const esVenta = tipo === "venta";
    const titulo = esVenta ? "¿Cuántas unidades has vendido?" : "¿Has recibido el pedido?";
    const botonTexto = esVenta ? "Registrar venta" : "Registrar recepción";
    const botonColor = esVenta ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700";

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
                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1">
                        Introduce la cantidad
                    </label>
                    <input
                        id="cantidad"
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                    />

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
