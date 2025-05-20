import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

const entidades = {
  almacenes: {
    label: "Almacenes",
    icon: "store",
    endpoint: "/almacenes",
  },
  categorias: {
    label: "Categorías",
    icon: "category",
    endpoint: "/categorias",
  },
  compradores: {
    label: "Compradores",
    icon: "person",
    endpoint: "/compradores",
  },
  proveedores: {
    label: "Proveedores",
    icon: "local_shipping",
    endpoint: "/proveedores",
  },
};

export default function CrudEntidades() {
  const [selectedType, setSelectedType] = useState("almacenes");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetch(entidades[selectedType].endpoint)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, [selectedType]);

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro que deseas eliminar este registro?")) {
      fetch(`${entidades[selectedType].endpoint}/${id}`, { method: "DELETE" })
        .then(() => setItems((prev) => prev.filter((item) => item.id !== id)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `${entidades[selectedType].endpoint}/${editingItem.id}`
      : entidades[selectedType].endpoint;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((savedItem) => {
        if (editingItem) {
          setItems((prev) => prev.map((item) => (item.id === savedItem.id ? savedItem : item)));
        } else {
          setItems((prev) => [...prev, savedItem]);
        }
        setEditingItem(null);
        e.target.reset();
      });
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-slate-100 p-4">
        <h2 className="text-sm font-semibold mb-4">Tipos de entidad</h2>
        {Object.entries(entidades).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setSelectedType(key)}
            className={`flex items-center gap-2 p-2 mb-2 w-full rounded-lg ${
              selectedType === key ? "bg-slate-300 font-bold" : "hover:bg-slate-200"
            }`}
          >
            <span className="material-icons text-base">{val.icon}</span>
            <span className="text-sm">{val.label}</span>
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{entidades[selectedType].label}</h1>
          <button
            onClick={() => setEditingItem({})}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            <span className="material-icons align-middle mr-1 text-sm">add</span>
            Nuevo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">
                  {item.nombre || item.identificacion || item.email || item.direccion || "Elemento"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingItem(item)}>
                  <span className="material-icons text-sm text-blue-600">edit</span>
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  <span className="material-icons text-sm text-red-500">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {editingItem && (
          <form onSubmit={handleSubmit} className="mt-6 bg-slate-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">{editingItem.id ? "Editar" : "Crear"} {entidades[selectedType].label}</h3>
            {selectedType !== "compradores" && (
              <input
                type="text"
                name="nombre"
                defaultValue={editingItem.nombre || ""}
                required
                placeholder="Nombre"
                className="mb-2 p-2 border rounded w-full"
              />
            )}
            {selectedType === "compradores" && (
              <>
                <input
                  type="text"
                  name="nombre"
                  defaultValue={editingItem.nombre || ""}
                  required
                  placeholder="Nombre"
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  name="identificacion"
                  defaultValue={editingItem.identificacion || ""}
                  placeholder="Identificación"
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  name="telefono"
                  defaultValue={editingItem.telefono || ""}
                  placeholder="Teléfono"
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="email"
                  name="email"
                  defaultValue={editingItem.email || ""}
                  placeholder="Email"
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  name="direccion"
                  defaultValue={editingItem.direccion || ""}
                  placeholder="Dirección"
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  name="tipo_comprador"
                  defaultValue={editingItem.tipo_comprador || ""}
                  placeholder="Tipo de Comprador"
                  className="mb-2 p-2 border rounded w-full"
                />
              </>
            )}
            {selectedType === "almacenes" && (
              <input
                type="text"
                name="direccion"
                defaultValue={editingItem.direccion || ""}
                placeholder="Dirección"
                className="mb-2 p-2 border rounded w-full"
              />
            )}
            {selectedType === "proveedores" && (
              <>
                <input
                  type="text"
                  name="telefono"
                  defaultValue={editingItem.telefono || ""}
                  placeholder="Teléfono"
                  className="mb-2 p-2 border rounded w-full"
                />
                <input
                  type="email"
                  name="email"
                  defaultValue={editingItem.email || ""}
                  placeholder="Email"
                  className="mb-2 p-2 border rounded w-full"
                />
              </>
            )}

            <button type="submit" className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700">
              Guardar
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
