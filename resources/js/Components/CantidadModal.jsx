import { router } from "@inertiajs/react";
import { useState } from "react";

export default function CantidadModal({ isOpen, onClose, onConfirm, producto, tipo }) {
    const [cantidad, setCantidad] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(route("proveedores.index"), producto, {
            onSuccess: () => {
                showModificableAlert(
                    "Pedido recibido",
                    "Se agregó el producto al inventario.",
                    "success"
                );
                onAdd && onAdd(formData);
                onClose();
                router.visit(route("inventario.index"), {
                    preserveScroll: true,
                });
            },
            onError: (errors) => {
                showModificableAlert(
                    "Error al añadir el producto",
                    `Error: ${JSON.stringify(errors)}`,
                    "error"
                );
            },
        });


    };

    if (!isOpen) return null;

    const esVenta = tipo === "venta";
    const titulo = esVenta ? "¿Cuántas unidades has vendido?" : "¿Cuántas unidades has recibido?";
    const botonTexto = esVenta ? "Registrar venta" : "Registrar recepción";
    const color = esVenta ? "green" : "blue";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{titulo}</h2>
                <p className="text-gray-600 mb-4">
                    Producto: <strong>{producto?.nombre}</strong>
                </p>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Cantidad:
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setCantidad("");
                                onClose();
                            }}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 text-gray-600 hover:text-gray-800`}
                        >
                            Confirmar recepcion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
