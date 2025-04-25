import { useState } from "react";

export default function EditProductModal({ product, onClose, context, almacenes }) {
    const [formData, setFormData] = useState({
        producto: product.producto,
        precio: product.precio,
        existencias: product.existencias,
        fecha: product.fecha,
        status: context === "orders" ? product.status : undefined,
        almacen: context === "stock" ? product.almacen : undefined,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log("Updated Product:", formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-slate-700 text-white rounded-sm shadow-md shadow-slate-400 p-8 w-[60vw]">
                <h2 className="text-2xl font-bold mb-6 text-slate-100">Editar Producto</h2>
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Producto</label>
                        <input
                            type="text"
                            name="producto"
                            value={formData.producto}
                            onChange={handleChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Precio</label>
                        <input
                            type="text"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Cantidad</label>
                        <input
                            type="text"
                            name="existencias"
                            value={formData.existencias}
                            onChange={handleChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Fecha</label>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        />
                    </div>
                    {context === "orders" && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Estado</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            >
                                <option value="cancelado">Cancelado</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="recibido">Recibido</option>
                            </select>
                        </div>
                    )}
                    {context === "stock" && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Almacén</label>
                            <select
                                name="almacen"
                                value={formData.almacen}
                                onChange={handleChange}
                                className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
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
                </form>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600"
                        onClick={handleSubmit}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
