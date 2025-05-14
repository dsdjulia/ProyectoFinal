import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Inertia } from '@inertiajs/inertia';
import { showModificableAlert } from "@/utils/alerts";
import { router } from "@inertiajs/react";

export default function AddModal({ isOpen, onClose, onAdd, context, almacenes, categorias, productos, proveedores }) {
    const [formData, setFormData] = useState({
        //datos producto
        id_categoria: "",
        codigo: "",
        nombre: "",
        descripcion:"",
        imagen: "",

        // datos inventario
        id_almacen: "",
        precio_unitario: "",
        cantidad_actual: "",
        nombre_categoria: "",
        perecedero: false,
        fecha_caducidad: '',
        // status: context === "orders" ? "" : undefined,

        // datos proveedor
        nombre_proveedor: "",
        telefono: "",
        email: "",
    });

    console.log(categorias);

    const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);
    const [mostrarFecha, setMostrarFecha] = useState(false);

const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Caso específico para el campo 'perecedero'
    if (name === "perecedero") {
        const isPerecedero = value === "true";  // Convertimos a booleano
        setFormData({
            ...formData,
            [name]: isPerecedero,
        });
        setMostrarFecha(isPerecedero);  // Mostramos la fecha si es true
        return;
    }

    // Caso específico para el campo 'almacen'
    if (name === "almacen") {
        const selectedAlmacen = almacenes.find(a => a.id === value);
        setFormData({
            ...formData,
            id_almacen: selectedAlmacen ? selectedAlmacen.id : "",  // Solo el ID
        });
        return;
    }

    // Manejo genérico para otros campos
    setFormData({
        ...formData,
        [name]: value,
    });

    console.log(formData);
};


    const handleCategoriaChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, id_categoria: null });
        setMostrarNuevaCategoria(value === 'nueva');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // onAdd(formData);
        onClose();

        router.post(route('producto.patch'), formData, {
            onSuccess: () => {
                showModificableAlert('Producto añadido', `${formData.producto} agregado al inventario.`, 'success');
                router.visit(route('inventario.index'), { preserveScroll: true });

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
                    



                    {context === "orders" && (
                        <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Producto</label>
                            <select
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="null">Seleccionar producto</option>
                                {productos.map((producto) => (
                                    <option key={producto.id} value={producto.id}>
                                        {producto.nombre}
                                    </option>
                                ))}
                            </select>
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
                            <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                            <input
                                type="text"
                                name="cantidad_actual"
                                value={formData.cantidad_actual}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Proveedor</label>
                            <select
                                name="nombre_proveedor"
                                value={formData.nombre_proveedor}
                                onChange={handleProveedorChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">Seleccionar proveedor</option>
                                <option value="nuevo">Nuevo proveedor</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id} value={proveedor.nombre}>{proveedor.nombre}</option>
                                ))}
                            </select>

                            {mostrarNuevoProveedor && (
                                <div className="mt-4 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Nombre del proveedor</label>
                                    <input
                                        type="text"
                                        name="nombre_proveedor"
                                        value={formData.nombre_proveedor}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                </div>
                            )}
                        </div> */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Proveedor</label>
                            <select
                                name="id_proveedor"
                                value={formData.id_proveedor}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="null">Seleccionar proveedor</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id} value={proveedor.id}>
                                        {proveedor.nombre}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Categoría</label>
                            <select
                                name="id_categoria"
                                value={formData.id_categoria}
                                onChange={handleCategoriaChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="null">Seleccionar categoría</option>
                                <option value="nueva">Nueva categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                ))}
                            </select>

                            {mostrarNuevaCategoria && (
                                <div className="mt-4 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Nombre nueva categoria</label>
                                    <input
                                        type="text"
                                        name="nombre_categoria"
                                        value={formData.nombre_categoria}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    />
                                    <label className="block text-sm font-medium text-gray-700">Perecedero</label>
                                    <select
                                        name="perecedero"
                                        value={formData.perecedero}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                    </select>

                                    {mostrarFecha && (
                                        <div className="mt-2">
                                            <label className="block text-sm font-medium text-gray-700">Fecha de Caducidad</label>
                                            <input
                                                type="date"
                                                name="fecha_caducidad"
                                                value={formData.fecha_caducidad}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="null">Seleccionar</option>
                                <option value="pendiente">Pendiente</option>
                                <option value="recibido">Recibido</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Almacén</label>
                            <select
                                name="id_almacen"
                                value={formData.id_almacen}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                            >
                                <option value="">Seleccionar almacén</option>
                                {almacenes.map((almacen) => (
                                    <option key={almacen.id} value={almacen.id}>
                                        {almacen.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                                

                        </>
                    )}
                    {context === "stock" && (
                        <>
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
                            <label className="block text-sm font-medium text-gray-700">Código del producto</label>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                                <select
                                    name="id_categoria"
                                    value={formData.id_categoria}
                                    onChange={handleCategoriaChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    <option value="null">Seleccionar categoría</option>
                                    <option value="nueva">Nueva categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                    ))}
                                </select>

                                {mostrarNuevaCategoria && (
                                    <div className="mt-4 space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Nombre nueva categoria</label>
                                        <input
                                            type="text"
                                            name="nombre_categoria"
                                            value={formData.nombre_categoria}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        />
                                        <label className="block text-sm font-medium text-gray-700">Perecedero</label>
                                        <select
                                            name="perecedero"
                                            value={formData.perecedero}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                        >
                                            <option value="null">Seleccionar</option>
                                            <option value="true">Sí</option>
                                            <option value="false">No</option>
                                        </select>

                                        {mostrarFecha && (
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700">Fecha de Caducidad</label>
                                                <input
                                                    type="date"
                                                    name="fecha_caducidad"
                                                    value={formData.fecha_caducidad}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Almacén</label>
                                <select
                                    name="id_almacen"
                                    value={formData.id_almacen}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
                                >
                                    <option value="">Seleccionar almacén</option>
                                    {almacenes.map((almacen) => (
                                        <option key={almacen.id} value={almacen.id}>
                                            {almacen.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
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
