import { useState } from "react";

// Importamos los modales para agregar y editar cada tipo de entidad
import AddAlmacenModal from "../Modales/AddAlmacenModal";
import AddCategoriaModal from "../Modales/AddCategoriaModal";
import AddClienteModal from "../Modales/AddClienteModal";
import AddProveedorModal from "../Modales/AddProveedorModal";

import EditAlmacenModal from "../Modales/EditAlmacenModal";
import EditCategoriaModal from "../Modales/EditCategoriaModal";
import EditClienteModal from "../Modales/EditClienteModal";
import EditProveedorModal from "../Modales/EditProveedorModal";
import { router, usePage } from "@inertiajs/react";
import { showModificableAlert } from "@/utils/alerts";

// Componente principal para gestionar entidades (almacenes, categorías, clientes, proveedores)
export default function CrudEntidades({ props }) {
    console.log(props);
    // Definimos las entidades disponibles con sus etiquetas, íconos y datos
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

    // Estado para saber qué tipo de entidad está seleccionada
    const [selectedType, setSelectedType] = useState(
        props.selectedType ?? "almacenes"
    );

    // Estado con los datos de todas las entidades (se puede actualizar al agregar o eliminar)
    const [data, setData] = useState(entidades);

    // Estados para controlar acciones: editar, eliminar o agregar
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToAdd, setItemToAdd] = useState(false); // Si se está agregando una nueva entidad

    // Accedemos a los datos actuales de la entidad seleccionada
    const currentItems = data[selectedType].data;
    const iconoEntidad = data[selectedType].icon;
    const tipoEntidad = data[selectedType].label;

    // Función para iniciar la edición de una entidad
    const handleEdit = (item) => setItemToEdit(item);

    // Función para eliminar una entidad del listado (solo visualmente)
    const handleDelete = (idEntidad) => {
        const updated = {
            ...data,
            [selectedType]: {
                ...data[selectedType],
                data: data[selectedType].data.filter(
                    (item) => item.id !== idEntidad
                ),
            },
        };
        setData(updated);
        setItemToDelete(null);

        switch (selectedType) {
            case "almacenes":
                router.delete(route("entidad.almacen.delete"), {
                    data: { id: idEntidad },
                    onSuccess: () => {
                        showModificableAlert(
                            "Almacén eliminado",
                            `Almacén eliminado del inventario.`,
                            "success"
                        );
                        // router.visit(route('entidades.index'), { preserveScroll: true });
                    },
                    onError: (errors) => {
                        showModificableAlert(
                            "Error al eliminar el almacén",
                            `${JSON.stringify(errors)}`,
                            "error"
                        );
                    },
                });

                break;
            case "categorias":
                router.delete(route("entidad.categoria.delete"), {
                    data: { id_categoria: idEntidad, redireccion: false },
                    onSuccess: () => {
                        showModificableAlert(
                            "Categoría eliminada",
                            `Categoría eliminada del sistema.`,
                            "success"
                        );
                    },
                    onError: (errors) => {
                        const msg =
                            errors.message || "Error al eliminar la categoría";
                        showModificableAlert("Error", msg, "error");
                    },
                });
                break;
            case "clientes":
                router.delete(route("XXXXXXXXXXXXXXXXXXXXXXX"), {
                    data: { id_cliente: idEntidad, redireccion: false },
                    onSuccess: () => {
                        showModificableAlert(
                            "Cliente eliminado",
                            `Cliente eliminado del sistema.`,
                            "success"
                        );
                        // router.visit(route('entidades.index'), { preserveScroll: true });
                    },
                    onError: (errors) => {
                        showModificableAlert(
                            "Error al eliminar el cliente",
                            `${JSON.stringify(errors)}`,
                            "error"
                        );
                    },
                });
                break;
            case "proveedores":
                router.delete(route("proveedor.destroy"), {
                    data: { id_proveedor: idEntidad, redireccion: false },
                    onSuccess: () => {
                        showModificableAlert(
                            "Proveedor eliminado",
                            `Proveedor eliminado del sistema.`,
                            "success"
                        );
                        // router.visit(route('entidades.index'), { preserveScroll: true });
                    },
                    onError: (errors) => {
                        showModificableAlert(
                            "Error al eliminar el proveedor",
                            `${JSON.stringify(errors)}`,
                            "error"
                        );
                    },
                });
                break;
            default:
                return null;
        }
    };

    // Renderiza el modal correspondiente para editar según el tipo seleccionado
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

    // Renderiza el modal correspondiente para agregar según el tipo seleccionado
    const renderAddModal = () => {
        if (!itemToAdd) return null;

        const closeAndAdd = (typeKey, newItem) => {
            setData((prev) => ({
                ...prev,
                [typeKey]: {
                    ...prev[typeKey],
                    data: [...prev[typeKey].data, newItem],
                },
            }));
            setItemToAdd(false);
        };

        switch (selectedType) {
            case "almacenes":
                return (
                    <AddAlmacenModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(item) => closeAndAdd("almacenes", item)}
                    />
                );
            case "categorias":
                return (
                    <AddCategoriaModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(item) => closeAndAdd("categorias", item)}
                    />
                );
            case "clientes":
                return (
                    <AddClienteModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(item) => closeAndAdd("clientes", item)}
                    />
                );
            case "proveedores":
                return (
                    <AddProveedorModal
                        isOpen={true}
                        onClose={() => setItemToAdd(false)}
                        onAdd={(item) => closeAndAdd("proveedores", item)}
                    />
                );
            default:
                return null;
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row h-full relative ">
            {/* Botón de menú (solo en móvil) */}
            <div className="md:hidden p-4 flex justify-between items-center bg-white shadow sticky top-0 z-20 ">
                <h2 className="text-base font-semibold text-slate-600">
                    {tipoEntidad}
                </h2>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-slate-600 text-2xl focus:outline-none"
                >
                    <span class="material-icons text-gray-500">
                        arrow_drop_down
                    </span>
                </button>
            </div>

            <aside
                className={`
    bg-white p-4 w-full md:w-1/5 md:block
    ${sidebarOpen ? "block" : "hidden"}
    md:relative fixed top-0 left-0 z-30 shadow md:shadow-none
  `}
            >
                <h2 className="pt-2 text-sm font-semibold mb-4 text-slate-600">
                    Elige el catálogo que quieres modificar
                </h2>
                <hr className="mb-4" />
                {Object.entries(data).map(([key, val]) => (
                    <button
                        key={key}
                        onClick={() => {
                            setSelectedType(key);
                            setSidebarOpen(false); // Oculta el menú al seleccionar en móvil
                        }}
                        className={`block text-left p-2 mb-2 w-full rounded-lg text-sm ${
                            selectedType === key
                                ? "bg-slate-300 font-bold"
                                : "hover:bg-slate-100 font-medium text-slate-600"
                        }`}
                    >
                        {val.label}
                    </button>
                ))}
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <h1 className="text-xl sm:text-2xl font-bold mb-6">
                    {tipoEntidad}
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative p-4 bg-white rounded-lg shadow hover:shadow-md transition flex flex-col justify-between hover:cursor-pointer"
                            onClick={() => handleEdit(item)}
                        >
                            <div>
                                <div className="w-full h-24 sm:h-32 bg-slate-200 rounded mb-4 flex items-center justify-center text-5xl sm:text-7xl text-slate-500">
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
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
