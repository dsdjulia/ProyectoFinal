import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { showModificableAlert } from "@/utils/alerts";

export default function AddModal({
    isOpen,
    onClose,
    onAdd,
    context,
    almacenes = [],
    categorias = [],
    productos = [],
    proveedores = [],
}) {
    const [formData, setFormData] = useState({
        id_categoria: "",
        codigo: "",
        nombre: "",
        descripcion: "",
        imagen: "",
        id_almacen: "",
        precio_unitario: "",
        cantidad_actual: "",
        perecedero: false,
        fecha_caducidad: "",
        id_proveedor: "",
        nombre_categoria: "",
        nombre_proveedor: "",
        telefono: "",
        email: "",
    });

    const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);
    const [mostrarFecha, setMostrarFecha] = useState(false);
    const [mostrarNuevoProveedor, setMostrarNuevoProveedor] = useState(false);

    const handleInputChange = ({ target: { name, value } }) => {
        if (name === "perecedero") {
            const isPerecedero = value === "true";
            setFormData((prev) => ({ ...prev, perecedero: isPerecedero }));
            setMostrarFecha(isPerecedero);
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoriaChange = ({ target: { value } }) => {
        setFormData((prev) => ({
            ...prev,
            id_categoria: value === "nueva" ? null : value,
        }));
        setMostrarNuevaCategoria(value === "nueva");
    };

    const handleProveedorChange = ({ target: { value } }) => {
        setFormData((prev) => ({
            ...prev,
            id_proveedor: value === "nuevo" ? null : value,
        }));
        setMostrarNuevoProveedor(value === "nuevo");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("producto.patch"), formData, {
            onSuccess: () => {
                showModificableAlert(
                    "Producto añadido",
                    "Se agregó el producto al inventario.",
                    "success"
                );
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
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
                    Añadir Nuevo Registro
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {context === "orders" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Producto
                                </label>
                                <select
                                    name="codigo"
                                    value={formData.codigo}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    <option value="">
                                        Seleccionar producto
                                    </option>
                                    {productos.map((producto) => (
                                        <option
                                            key={producto.id}
                                            value={producto.id}
                                        >
                                            {producto.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Precio unitario
                                </label>
                                <input
                                    type="text"
                                    name="precio_unitario"
                                    value={formData.precio_unitario}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Cantidad
                                </label>
                                <input
                                    type="text"
                                    name="cantidad_actual"
                                    value={formData.cantidad_actual}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Proveedor
                                </label>
                                <select
                                    name="id_proveedor"
                                    value={formData.id_proveedor}
                                    onChange={handleProveedorChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    <option value="">
                                        Seleccionar proveedor
                                    </option>
                                    <option value="nuevo">
                                        Nuevo proveedor
                                    </option>
                                    {proveedores.map((proveedor) => (
                                        <option
                                            key={proveedor.id}
                                            value={proveedor.id}
                                        >
                                            {proveedor.nombre}
                                        </option>
                                    ))}
                                </select>
                                {mostrarNuevoProveedor && (
                                    <div className="mt-4 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Nombre del proveedor
                                        </label>
                                        <input
                                            type="text"
                                            name="nombre_proveedor"
                                            value={formData.nombre_proveedor}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                        <label className="block text-sm font-medium text-gray-700">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                        <label className="block text-sm font-medium text-gray-700">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {context === "stock" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <input
                                    type="text"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Almacén
                                </label>
                                <select
                                    name="id_almacen"
                                    value={formData.id_almacen}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    <option value="">
                                        Seleccionar almacén
                                    </option>
                                    {almacenes.map((almacen) => (
                                        <option
                                            key={almacen.id}
                                            value={almacen.id}
                                        >
                                            {almacen.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Precio unitario
                                </label>
                                <input
                                    type="number"
                                    name="precio_unitario"
                                    value={formData.precio_unitario}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Cantidad
                                </label>
                                <input
                                    type="number"
                                    name="cantidad_actual"
                                    value={formData.cantidad_actual}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    ¿Perecedero?
                                </label>
                                <select
                                    name="perecedero"
                                    value={formData.perecedero.toString()}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    <option value="false">No</option>
                                    <option value="true">Sí</option>
                                </select>
                            </div>
                            {mostrarFecha && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Fecha de Caducidad
                                    </label>
                                    <input
                                        type="date"
                                        name="fecha_caducidad"
                                        value={formData.fecha_caducidad}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <button
                        type="submit"
                        className="bg-slate-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-slate-600"
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </Dialog>
    );
}
