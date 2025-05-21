import { useState } from "react";

import AddAlmacenModal from "../Modales/AddAlmacenModal";
import AddCategoriaModal from "../Modales/AddCategoriaModal";
import AddClienteModal from "../Modales/AddClienteModal";
import AddProveedorModal from "../Modales/AddProveedorModal";

import EditAlmacenModal from "../Modales/EditAlmacenModal";
import EditCategoriaModal from "../Modales/EditCategoriaModal";
import EditClienteModal from "../Modales/EditClienteModal";
import EditProveedorModal from "../Modales/EditProveedorModal";


export default function CrudEntidades({ props }) {

    const entidades = {
    almacenes: {
        label: "Almacenes",
        icon: "📦",
        data: props.all_almacenes,
    },
    categorias: {
        label: "Categorías",
        icon: "🗂️",
        data: props.all_categorias,
    },
    clientes: {
        label: "Clientes",
        icon: "🧑‍💼",
        data: props.all_clientes,
    },
    proveedores: {
        label: "Proveedores",
        icon: "🚚",
        data: props.all_proveedores,
    },
};



    const [selectedType, setSelectedType] = useState("almacenes");
    const [data, setData] = useState(entidades);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToAdd, setItemToAdd] = useState(false); // <-- Nuevo estado

    const currentItems = data[selectedType].data;
    const iconoEntidad = data[selectedType].icon;
    const tipoEntidad = data[selectedType].label;
    
    console.log(props)

    const handleEdit = (item) => setItemToEdit(item);

    const handleDelete = (id) => {
        const updated = {
            ...data,
            [selectedType]: {
                ...data[selectedType],
                data: data[selectedType].data.filter((item) => item.id !== id),
            },
        };
        setData(updated);
        setItemToDelete(null);
    };

    const renderEditModal = () => {
        if (!itemToEdit) return null;
        switch (selectedType) {
            case "almacenes":
                return (
                    <EditAlmacenModal
                        entity={itemToEdit}
                        onClose={() => setItemToEdit(null)}
                    />
                );
            case "categorias":
                return (
                    <EditCategoriaModal
                        entity={itemToEdit}
                        onClose={() => setItemToEdit(null)}
                    />
                );
            case "clientes":
                return (
                    <EditClienteModal
                        entity={itemToEdit}
                        onClose={() => setItemToEdit(null)}
                    />
                );
            case "proveedores":
                return (
                    <EditProveedorModal
                        entity={itemToEdit}
                        onClose={() => setItemToEdit(null)}
                    />
                );
            default:
                return null;
        }
    };
    const renderAddModal = () => {
        if (!itemToAdd) return null;
        switch (selectedType) {
            case "almacenes":
                return (
                    <AddAlmacenModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(newItem) => {
                            setData((prev) => ({
                                ...prev,
                                almacenes: {
                                    ...prev.almacenes,
                                    data: [...prev.almacenes.data, newItem],
                                },
                            }));
                            setItemToAdd(false);
                        }}
                    />
                );
            case "categorias":
                return (
                    <AddCategoriaModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(newItem) => {
                            setData((prev) => ({
                                ...prev,
                                categorias: {
                                    ...prev.categorias,
                                    data: [...prev.categorias.data, newItem],
                                },
                            }));
                            setItemToAdd(false);
                        }}
                    />
                );
            case "clientes":
                return (
                    <AddClienteModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(newItem) => {
                            setData((prev) => ({
                                ...prev,
                                clientes: {
                                    ...prev.clientes,
                                    data: [...prev.clientes.data, newItem],
                                },
                            }));
                            setItemToAdd(false);
                        }}
                    />
                );
            case "proveedores":
                return (
                    <AddProveedorModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(newItem) => {
                            setData((prev) => ({
                                ...prev,
                                proveedores: {
                                    ...prev.proveedores,
                                    data: [...prev.proveedores.data, newItem],
                                },
                            }));
                            setItemToAdd(false);
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen relative">
            <aside className="w-1/4 bg-white  p-4">
                <h2 className="pt-2 text-sm font-semibold mb-4 text-slate-600">
                    Elige el catálogo que quieres modificar
                </h2>
                <hr />
                <br />
                {Object.entries(data).map(([key, val]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedType(key)}
                        className={`block text-left p-2 mb-2 w-full rounded-lg text-sm ${
                            selectedType === key
                                ? "bg-slate-300 font-bold "
                                : "hover:bg-slate-100 font-medium text-slate-600 "
                        }`}
                    >
                        {val.label}
                    </button>
                ))}
            </aside>

            <main className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">{tipoEntidad}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Crear nuevo */}
                    <div
                        onClick={() => setItemToAdd(true)}
                        className="flex flex-col items-center justify-center p-6 bg-slate-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-200"
                    >
                        <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center text-3xl font-bold">
                            +
                        </div>
                        <p className="mt-4 text-sm font-medium text-slate-600">
                            Crear nuevo
                        </p>
                    </div>

                    {/* Listado de entidades */}
                    {currentItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative p-4 bg-white rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-full h-32 bg-slate-200 rounded mb-4 flex items-center justify-center text-7xl text-slate-500">
                                    {iconoEntidad}
                                </div>
                                <h2 className="text-sm font-bold mb-1">
                                    {item.nombre || item.email || "Elemento"}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {item.direccion ||
                                        item.telefono ||
                                        item.identificacion ||
                                        item.tipo_comprador ||
                                        ""}
                                </p>
                            </div>

                            {/* Botones con íconos en esquina inferior derecha */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-slate-600 hover:text-slate-800"
                                    title="Editar"
                                >
                                    <span className="material-icons">edit</span>
                                </button>
                                <button
                                    onClick={() => setItemToDelete(item)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Eliminar"
                                >
                                    <span className="material-icons">
                                        delete
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal de edición */}
            {renderEditModal()}

            {/* Modal de creación */}
            {renderAddModal()}

            {/* Modal de confirmación de eliminación */}
            {itemToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-lg font-bold mb-4">
                            ¿Eliminar {tipoEntidad.slice(0, -2)}?
                        </h2>
                        <p className="text-sm mb-6 text-slate-600">
                            ¿Estás seguro que quieres eliminar{" "}
                            <strong>{itemToDelete.nombre}</strong>?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setItemToDelete(null)}
                                className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300 text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(itemToDelete.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
