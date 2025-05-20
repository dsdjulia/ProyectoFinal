import { showModificableAlert } from "@/utils/alerts";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function EditproductoModal({ producto, onClose, context, almacenes = [], categorias = [], proveedores }) {
  const [formData, setFormData] = useState({
    codigo: producto.codigo,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    imagen: producto.producto_imagen,
    id_categoria: producto.id_categoria,
    nombre_categoria: producto.nombre_categoria,
    id_almacen: producto.id_almacen,
    precio_unitario: producto.precio_unitario,
    cantidad_actual: producto.cantidad_actual,
    perecedero: producto.fecha_vencimiento ? true : false,
    fecha_vencimiento: producto.fecha_vencimiento,
    id_proveedor: producto.id_proveedor,
    nombre_proveedor: producto.proveedor,
    id_detalle: producto.id_detalle,
    status: context === "orders" ? producto.status : undefined,
    almacen: context === "stock" ? producto.almacen_nombre : undefined,
    telefono: producto.telefono || "",
    email: producto.email || "",
  });

  const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);
  const [mostrarNuevoProveedor, setMostrarNuevoProveedor] = useState(false);

  const handleInputChange = ({ target: { name, value, type, checked } }) => {
    const inputValue = type === "checkbox" ? checked : value;
    if (name === "perecedero") {
      setFormData(prev => ({ ...prev, [name]: inputValue, fecha_vencimiento: "" }));
    } else {
      setFormData(prev => ({ ...prev, [name]: inputValue }));
    }
  };

  const handleCategoriaChange = ({ target: { value } }) => {
    setMostrarNuevaCategoria(value === "nueva");
    setFormData(prev => ({ ...prev, id_categoria: value === "nueva" ? "" : value }));
  };

  const handleProveedorChange = ({ target: { value } }) => {
    setMostrarNuevoProveedor(value === "nuevo");
    setFormData(prev => ({ ...prev, id_proveedor: value === "nuevo" ? "" : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.patch(route("pedidos.patchInventario"), formData, {
      onSuccess: () => {
        showModificableAlert("Pedido actualizado", `El producto ${producto.nombre} se ha actualizado.`, "success");
        onClose();
        router.visit(route("pedidos.index"), { preserveScroll: true });
      },
      onError: (error) =>
        showModificableAlert("Error al actualizar el producto", `Error: ${JSON.stringify(error)}`, "error"),
    });
  };

  if (producto.estado) {
    showModificableAlert("Pedido ya recibido", `No se puede editar un producto ya recibido`, "error");
    onClose();
    return;
  }

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-md shadow-md shadow-slate-400 p-6 w-full max-w-4xl max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
            {context === "orders" ? "Editar Pedido" : "Editar Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="block font-medium text-black">Código</label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-black">Producto</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-black">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows={2}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
              placeholder="Descripción del producto"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-black">Imagen (URL)</label>
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
              placeholder="https://example.com/imagen.jpg"
            />
          </div>

          <div>
            <label className="block font-medium text-black">Categoría</label>
            <select
              name="id_categoria"
              value={formData.id_categoria}
              onChange={handleCategoriaChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
            >
              <option value={formData.id_categoria}>{formData.nombre_categoria}</option>
              <option value="nueva">Nueva categoría</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
            {mostrarNuevaCategoria && (
              <input
                type="text"
                name="nombre_categoria"
                placeholder="Nueva categoría"
                value={formData.nombre_categoria}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded p-1.5 mt-2 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
              />
            )}
          </div>

          <div>
            <label className="block font-medium text-black">Almacén</label>
            <select
              name="id_almacen"
              value={formData.id_almacen}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
            >
              <option value="">Seleccionar almacén</option>
              {almacenes.map(a => (
                <option key={a.id} value={a.id}>{a.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-black">Precio unitario</label>
            <input
              type="number"
              name="precio_unitario"
              step="0.01"
              value={formData.precio_unitario}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-black">Cantidad</label>
            <input
              type="number"
              name="cantidad_actual"
              value={formData.cantidad_actual}
              onChange={handleInputChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
            />
          </div>

          <div className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              name="perecedero"
              checked={formData.perecedero}
              onChange={handleInputChange}
            />
            <label className="text-sm text-black">¿Producto perecedero?</label>
          </div>

          {formData.perecedero && (
            <div>
              <label className="block font-medium text-black">Fecha de caducidad</label>
              <input
                type="date"
                name="fecha_vencimiento"
                value={formData.fecha_vencimiento}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
              />
            </div>
          )}

          <div>
            <label className="block font-medium text-black">Proveedor</label>
            <select
              name="id_proveedor"
              value={formData.id_proveedor}
              onChange={handleProveedorChange}
              className="w-full border border-slate-300 rounded p-1.5 mt-1 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
            >
              <option value="">Seleccionar proveedor</option>
              <option value="nuevo">Nuevo proveedor</option>
              {proveedores.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          {mostrarNuevoProveedor && (
            <div className="md:col-span-2 grid gap-2">
              <input
                type="text"
                name="nombre_proveedor"
                placeholder="Nombre del proveedor"
                value={formData.nombre_proveedor}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded p-1.5 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded p-1.5 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-slate-300 rounded p-1.5 bg-white focus:ring-2 focus:ring-slate-400 focus:outline-none text-black"
              />
            </div>
          )}
        </form>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded-md text-white bg-slate-500 hover:bg-slate-700 transition"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
