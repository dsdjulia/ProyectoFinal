import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { showModificableAlert } from "@/utils/alerts";

export default function EditClienteModal({ entity, onClose }) {
  const [form, setForm] = useState({
    id_cliente: entity.id,
    nombre: entity.nombre,
    identificacion: entity.identificacion,
    telefono: entity.telefono,
    email: entity.email,
    direccion: entity.direccion,
    tipo_comprador: entity.tipo_comprador,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.nombre && form.identificacion && form.email) {
      router.patch(route("entidad.cliente.update"), form, {
        // preserveScroll: true,
        onSuccess: () => {
          showModificableAlert("Cliente actualizado", `${form.nombre} modificado correctamente.`, "success");
          onClose();
        },
        onError: (errors) => {
          showModificableAlert("Error al editar cliente", `Error: ${JSON.stringify(errors)}`, "error");
        },
      });
    } else {
      showModificableAlert("Campos incompletos", "Por favor completa todos los campos obligatorios.", "warning");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Editar Comprador</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Nombre"
          />
          <input
            type="text"
            name="identificacion"
            value={form.identificacion}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Identificación"
          />
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Teléfono"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Email"
          />
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Dirección"
          />
          <input
            type="text"
            name="tipo_comprador"
            value={form.tipo_comprador}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Tipo de comprador"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
