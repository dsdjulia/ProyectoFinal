import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Inertia } from '@inertiajs/inertia';
import { showModificableAlert } from "@/utils/alerts";
import { router } from "@inertiajs/react";

export default function AddModal({ isOpen, onClose, onAdd, context, almacenes }) {
    const [formData, setFormData] = useState({
        //datos producto
        id_categoria: "",
        codigo: "",
        nombre: "",
        descripcion:"",
        imagen: "",

        // datos inventario
        id_almacen: context === "stock" ? "" : undefined,
        precio_unitario: "",
        cantidad_actual: "",

        // status: context === "orders" ? "" : undefined,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "almacen") {
            // Buscamos el objeto del almacén y guardamos solo el nombre
            const selectedAlmacen = almacenes.find(a => a.nombre === value);
            setFormData({
                ...formData,
                almacen: selectedAlmacen ? selectedAlmacen.nombre : "",
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // onAdd(formData);
        onClose();

        router.post('inventario/producto', formData, {
            onSuccess: () => {
                showModificableAlert('Producto añadido', `${formData.producto} agregado al inventario.`, 'success');
            },
            onError: (errors) => {
                showModificableAlert('Error al añadir el producto', `Error: ${JSON.stringify(errors)}`, 'error');
            }
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
                        <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripcion</label>
                        <textarea
                            type="text"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Precio unitario</label>
                        <input
                            type="text"
                            name="precio_unitario"
                            value={formData.precio_unitario}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Existencias</label>
                        <input
                            type="text"
                            name="cantidad_actual"
                            value={formData.cantidad_actual}
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
                                name="id_almacen"
                                value={formData.id_almacen}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">Seleccionar</option>
                                {almacenes.map((almacen) => (
                                    <option key={almacen.id} value={almacen.nombre}>
                                        {almacen.nombre}
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
