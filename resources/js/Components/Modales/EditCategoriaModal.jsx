import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { showModificableAlert } from "@/utils/alerts";

export default function EditCategoriaModal({ entity, onClose }) {
  const [form, setForm] = useState({
    id_categoria: entity.id,
    nombre_antiguo: entity.nombre,
    nombre: entity.nombre,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.nombre) {
      router.patch(route("entidad.categoria.update", entity.id), form, {
        preserveScroll: true,
        onSuccess: () => {
          showModificableAlert("Categoría actualizada", `${form.nombre} modificada correctamente.`, "success");
          onClose();

          // Redirige sin mostrar en la URL el selectedType
          // router.visit(route("entidades.index"), {
          //   data: {
          //     selectedType: "categorias",
          //   }});
        },
        onError: (errors) => {
          showModificableAlert("Error al editar categoría", `Error: ${JSON.stringify(errors)}`, "error");
        },
      });
    } else {
      showModificableAlert("Campo incompleto", "Por favor rellena el nombre de la categoría.", "warning");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Editar Categoría</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Nombre"
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
