import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function AddModal({ isOpen, onClose, onAdd, context, almacenes }) {
    const [formData, setFormData] = useState({
        imagen: "",
        codigo: "",
        producto: "",
        precio: "",
        existencias: "",
        fecha: "",
        status: context === "orders" ? "" : undefined,
        almacen: context === "stock" ? "" : undefined,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
        setFormData({
            imagen: "",
            codigo: "",
            producto: "",
            precio: "",
            existencias: "",
            fecha: "",
            status: context === "orders" ? "" : undefined,
            almacen: context === "stock" ? "" : undefined,
        });
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">Añadir Nuevo Registro</Dialog.Title>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
                        <input
                            type="text"
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID Producto</label>
                        <input
                            type="text"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Artículo</label>
                        <input
                            type="text"
                            name="producto"
                            value={formData.producto}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Precio</label>
                        <input
                            type="text"
                            name="precio"
                            value={formData.precio}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                        <input
                            type="text"
                            name="existencias"
                            value={formData.existencias}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha Recepción</label>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>
                    {context === "orders" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">Seleccionar</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="recibido">Recibido</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                    )}
                    {context === "stock" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Almacén</label>
                            <select
                                name="almacen"
                                value={formData.almacen}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">Seleccionar</option>
                                {almacenes.map((almacen, index) => (
                                    <option key={index} value={almacen}>
                                        {almacen}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-600"
                        >
                            Añadir
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
