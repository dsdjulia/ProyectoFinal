import { showModificableAlert } from "@/utils/alerts";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function EditproductoModal({ producto, onClose, context, almacenes = [], categorias = [], proveedores = []}) {

    const [formData, setFormData] = useState({
        id_categoria: producto.categoria,
        codigo: producto.codigo,
        nombre: producto.nombre,
        imagen: producto.imagen,
        id_almacen: producto.almacen_id,
        precio_unitario: producto.precio_unitario,
        cantidad_actual: producto.cantidad_actual,
        perecedero: false,
        fecha_caducidad: "",
        id_proveedor: "",
        nombre_categoria: "",
        nombre_proveedor: "",
        telefono: "",
        email: "",

        status: context === "orders" ? producto.status : undefined,
        almacen: context === "stock" ? producto.almacen_nombre : undefined,
    });
    console.log(formData);

    const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);
    const [mostrarNuevoProveedor, setMostrarNuevoProveedor] = useState(false);
    const [mostrarFecha, setMostrarFecha] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "almacen") {
            const selectedAlmacen = almacenes.find(a => a.nombre === value);
            setFormData(prev => ({
                ...prev,
                almacen: selectedAlmacen ? selectedAlmacen.nombre : "",
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleInputChange = ({ target: { name, value, type, checked } }) => {
        const inputValue = type === "checkbox" ? checked : value;

        if (name === "perecedero") {
            setMostrarFecha(inputValue);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: inputValue,
        }));
    };

    const handleCategoriaChange = ({ target: { value } }) => {
        setMostrarNuevaCategoria(value === "nueva");
        setFormData((prev) => ({
            ...prev,
            id_categoria: value === "nueva" ? "" : value,
        }));
    };

    const handleProveedorChange = ({ target: { value } }) => {
        setMostrarNuevoProveedor(value === "nuevo");
        setFormData((prev) => ({
            ...prev,
            id_proveedor: value === "nuevo" ? "" : value,
        }));
    };

    const handleSubmit = () => {
        Inertia.patch(`api/productoos/${producto.id}`, formData, {
            onSuccess: () => {
                showModificableAlert('productoo actualizado', `${producto.nombre} actualizado.`, 'success');
                onClose();
            },
            onError: (error) =>
                showModificableAlert('Error al actualizar el productoo', `Error: ${error}`, 'error'),
        });
    };

    return (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-slate-700 text-white rounded-sm shadow-md shadow-slate-400 p-8 w-[60vw]">
                <h2 className="text-2xl font-bold mb-6 text-slate-100">Editar productoo</h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Código */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300">
                            Código
                        </label>
                        <input
                            type="text"
                            name="codigo"
                            value={formData.codigo}
                            readOnly
                            onChange={handleInputChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        />
                    </div>

                    {/* Nombre del productoo */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300">
                            Producto
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            readOnly
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            placeholder="Nombre del producto"
                        />
                    </div>

                    {/* Descripción */}
                    {/* <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            rows={3}
                            placeholder="Descripción del productoo"
                        />
                    </div> */}

                    {/* Imagen */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300">
                            Imagen (URL)
                        </label>
                        <input
                            type="text"
                            name="imagen"
                            value={formData.imagen}
                            onChange={handleInputChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            placeholder="https://example.com/imagen.jpg"
                        />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300">
                            Categoría
                        </label>
                        <select
                            name="id_categoria"
                            value={formData.id_categoria}
                            onChange={handleCategoriaChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        >
                            <option value="">Seleccionar categoría</option>
                            <option value="nueva">Nueva categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>
                        {mostrarNuevaCategoria && (
                            <input
                                type="text"
                                name="nombre_categoria"
                                placeholder="Nueva categoría"
                                value={formData.nombre_categoria}
                                onChange={handleInputChange}
                                className="mt-2 w-full border rounded-lg py-2 px-4"
                            />
                        )}
                    </div>

                    {/* Almacén */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300">
                            Almacén
                        </label>
                        <select
                            name="id_almacen"
                            value={formData.id_almacen}
                            onChange={handleInputChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        >
                            <option value="">Seleccionar almacén</option>
                            {almacenes.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300">
                            Precio unitario
                        </label>
                        <input
                            type="number"
                            name="precio_unitario"
                            step="0.01"
                            value={formData.precio_unitario}
                            onChange={handleInputChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        />
                    </div>

                    {/* Cantidad */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300">
                            Cantidad
                        </label>
                        <input
                            type="number"
                            name="cantidad_actual"
                            value={formData.cantidad_actual}
                            onChange={handleInputChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        />
                    </div>

                    {/* Perecedero */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="perecedero"
                            checked={formData.perecedero}
                            onChange={handleInputChange}
                        />
                        <label className="text-sm text-slate-300">
                            ¿Producto perecedero?
                        </label>
                    </div>

                    {/* Fecha de caducidad */}
                    {formData.perecedero && (
                        <div>
                            <label className="block text-sm font-medium text-slate-300">
                                Fecha de caducidad
                            </label>
                            <input
                                type="date"
                                name="fecha_caducidad"
                                value={formData.fecha_caducidad}
                                onChange={handleInputChange}
                                className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            />
                        </div>
                    )}

                    {/* Proveedor */}
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-slate-300">
                            Proveedor
                        </label>
                        <select
                            name="id_proveedor"
                            value={formData.id_proveedor}
                            onChange={handleProveedorChange}
                            className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                        >
                            <option value="">Seleccionar proveedor</option>
                            <option value="nuevo">Nuevo proveedor</option>
                            {proveedores.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {mostrarNuevoProveedor && (
                        <div className="md:col-span-2 space-y-2">
                            <input
                                type="text"
                                name="nombre_proveedor"
                                placeholder="Nombre del proveedor"
                                value={formData.nombre_proveedor}
                                onChange={handleInputChange}
                                className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            />
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none text-slate-100"
                            />
                        </div>
                    )}

                    {/* Botón */}
                    {/* <div className="md:col-span-2 text-right mt-4">
                        <button
                            type="submit"
                            className="bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg py-2 px-4"
                        >
                            Guardar
                        </button>
                    </div> */}
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
