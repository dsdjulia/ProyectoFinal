import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { showModificableAlert } from "@/utils/alerts"; // Ajusta el path según dónde tengas esta función

export default function AddAlmacenModal({ isOpen, onClose, onAdd }) {
    const [form, setForm] = useState({
        nombre: "",
        productos_count: 0,
        precio_total: 0,
        direccion: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.nombre && form.direccion) {
            onClose(); // cerrar el modal primero

            router.post(route("inventario.store"), form, {
                onSuccess: () => {
                    showModificableAlert(
                        "Almacén añadido",
                        `${form.nombre} agregado al inventario.`,
                        "success"
                    );
                    router.visit(route("inventario.index"), { preserveScroll: true });

                    if (onAdd) onAdd(form); // opcional si quieres notificar al componente padre
                },
                onError: (errors) => {
                    showModificableAlert(
                        "Error al añadir el almacén",
                        `Error: ${JSON.stringify(errors)}`,
                        "error"
                    );
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 space-y-4 shadow-xl">
                <h2 className="text-lg font-bold text-slate-700">Añadir Almacén</h2>
                <input
                    name="nombre"
                    placeholder="Nombre"
                    onChange={handleChange}
                    value={form.nombre}
                    className="w-full p-2 border rounded"
                />
                <input
                    name="direccion"
                    placeholder="Dirección"
                    onChange={handleChange}
                    value={form.direccion}
                    className="w-full p-2 border rounded"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="text-red-500 hover:underline"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
