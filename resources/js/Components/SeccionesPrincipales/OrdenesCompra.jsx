import { useState, useEffect } from "react";
import ProductTableRow from "../ProductTableRow";
import AddModal from "../Modales/AddModal";
import DeleteProductModal from "../Modales/DeleteProductModal";
import CantidadModal from "../Modales/CantidadModal";
import { router } from "@inertiajs/react";
import AddAlmacenModal from "../Modales/AddAlmacenModal";

export default function OrdenesCompra({ props }) {
    const [products, setProducts] = useState(props.all_productos);
    const [almacenes, setAlmacenes] = useState(props.data);
    const [categorias, setCategorias] = useState(props.categorias);
    const [proveedores, setProveedores] = useState(props.all_proveedores);
    const [compras, setCompras] = useState(props.detalles_compras);

    const [isAlmacenModalOpen, setIsAlmacenModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCantidadModalOpen, setCantidadModalOpen] = useState(false);

    const [selectedPedido, setselectedPedido] = useState(null);
    const [tipoOperacion, setTipoOperacion] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [pagActual, setpagActual] = useState(1);
    const [cantPag, setcantPag] = useState(1);
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        const filtrados = compras.filter((product) =>
            product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        ); // Filtramos los productos por las coincidencias en el nombre
        setProductosFiltrados(filtrados); // Modificamos el array total con los elementos filtrados
        setcantPag(Math.ceil(filtrados.length / 10) || 1); // Recalculamos el total de paginas
        setpagActual(1); // Volvemos a la primera página
    }, [searchTerm, compras]);

    // Paginamos el array de productos ya filtrados
    const arrayProductos = productosFiltrados.slice(
        (pagActual - 1) * 10,
        pagActual * 10
    );

    const pageUp = () => {
        if (pagActual < cantPag) {
            setpagActual(pagActual + 1);
        }
    };

    const pageDown = () => {
        if (pagActual > 1) {
            setpagActual(pagActual - 1);
        }
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleAddAlmacen = (newAlmacen) => {
        setAlmacenes([...almacenes, newAlmacen]);
    };

    const handleDeleteProduct = (product) => {
        setselectedPedido(product);
        setIsDeleteModalOpen(true);
    };

    const handleConfirm = (cantidad) => {
        router.post(
            route("pedidos.destroy"),
            { id_detalle: selectedPedido.id },
            {
                onSuccess: () => {
                    showModificableAlert(
                        "Pedido eliminado",
                        "Se eliminó el pedido correctamente.",
                        "success"
                    );
                    setIsDeleteModalOpen(false);
                    router.visit(route("pedidos.index"), {
                        preserveScroll: true,
                    });
                },
                onError: (errors) => {
                    showModificableAlert(
                        "Error al eliminar el pedido",
                        `Error: ${JSON.stringify(errors)}`,
                        "error"
                    );
                },
            }
        );
    };

    if (!almacenes || almacenes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pb-32 h-screen text-center gap-6">
                <span className="material-icons text-slate-400 text-7xl">
                    warehouse
                </span>
                <h1 className="text-3xl font-bold text-gray-700">
                    ¡Primero debes ingresar tu primer almacén!
                </h1>
                <button
                    onClick={() => setIsAlmacenModalOpen(true)}
                    className="bg-slate-600 text-white px-6 py-3 rounded-lg text-md font-semibold hover:bg-slate-700 transition"
                >
                    Crear Almacén
                </button>

                <AddAlmacenModal
                    isOpen={isAlmacenModalOpen}
                    onClose={() => setIsAlmacenModalOpen(false)}
                    onAdd={handleAddAlmacen}
                />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col align-middle justify-start p-6 sm:p-12 pt-0 pb-34 ">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mt-4 pb-4">
                <div className="flex justify-between items-center mb-4 p-6">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Pedidos
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-slate-500 text-white px-4 py-2 rounded-md font-extrabold hover:bg-slate-600"
                    >
                        Nuevo
                    </button>
                </div>

                <div className="flex justify-between items-center mb-4 px-6">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="border border-gray-300 rounded-lg py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Responsive layout */}
                <div className="hidden lg:block">
                    {/* Table for large screens */}
                    <div className="grid grid-cols-8 items-center bg-slate-100 font-semibold text-gray-700 py-2 px-8 gap-2 mb-6 mt-4">
                        <div className="text-start">Código Producto</div>
                        <div className="text-start pl-4 col-span-2">
                            Artículo
                        </div>
                        <div className="text-center">Precio</div>
                        <div className="text-center">Cantidad</div>
                        <div className="text-center">Estado</div>
                        <div className="text-center">Fecha Recepción</div>
                        <div className="text-center">Acciones</div>
                    </div>

                    <div className="grid grid-cols-1 px-4 pb-4">
                        {arrayProductos.map((compra, index) => (
                            <ProductTableRow
                                key={index}
                                product={compra}
                                categorias={categorias}
                                context="orders"
                                almacenes={almacenes}
                                proveedores={proveedores}
                                clickable={false}
                                onDelete={() => handleDeleteProduct(compra)}
                                onCantidadClick={(tipo) => {
                                    setselectedPedido(compra);
                                    setTipoOperacion(tipo);
                                    setCantidadModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Cards for small and medium screens */}
                <div className="grid gap-6 px-2 sm:grid-cols-1 md:grid-cols-2 lg:hidden text-xs md:text-md">
                    {arrayProductos.map((compra, index) => (

                        <div
                            key={index}
                            className="bg-gray-100 rounded-lg shadow p-4 flex flex-col gap-2 w-full mx-auto"
                        >
                            {console.log(compra)}
                            <div className="text-sm md:text-md font-semibold text-center">
                                {compra.nombre}
                            </div>
                            <div className="text-gray-600 text-center">
                                <b>Código Producto:</b> {compra.codigo}
                            </div>
                            <div className="text-gray-600 text-center">
                                <b>Precio:</b> {compra.precio_unitario}
                            </div>
                            <div className="text-gray-600 text-center">
                                <b>Cantidad: </b>
                                {compra.cantidad_actual}
                            </div>
                            <div className="text-gray-600 text-center">
                                <b>Fecha: </b>
                                {compra.fecha_compra}
                            </div>
                            <div className="text-gray-600 text-center">
                                <b>Estado:</b> {compra.estado?"Recibido":"Pendiente"}
                            </div>

                            <div className="flex justify-center gap-2 mt-6 md:mt-0">
                                <button
                                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                                    onClick={() => handleDeleteProduct(compra)}
                                >
                                    <span className="material-icons text-sm mr-1">
                                        delete
                                    </span>

                                </button>
                                <button
                                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                                    onClick={() => {
                                        setselectedPedido(compra);
                                        setTipoOperacion("modificar");
                                        setCantidadModalOpen(true);
                                    }}
                                >
                                    <span className="material-icons text-sm mr-1">
                                        edit
                                    </span>

                                </button>
                                <button
                                    className="flex items-center bg-slate-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-600"
                                    onClick={() => {
                                        setselectedPedido(compra);
                                        setTipoOperacion("vender");
                                        setCantidadModalOpen(true);
                                    }}
                                >
                                    <span className="material-icons text-sm mr-1">
                                        inventory_2
                                    </span>

                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-6 gap-4">
                    <button
                        onClick={pageDown}
                        disabled={pagActual === 1}
                        className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        <span className="material-icons text-gray-700">
                            chevron_left
                        </span>
                    </button>

                    <span className="text-sm text-gray-600">
                        Página {pagActual} de {cantPag}
                    </span>

                    <button
                        onClick={pageUp}
                        disabled={pagActual === cantPag}
                        className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        <span className="material-icons text-gray-700">
                            chevron_right
                        </span>
                    </button>
                </div>

                <AddModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddProduct}
                    context="orders"
                    almacenes={almacenes}
                    categorias={categorias}
                    proveedores={proveedores}
                />

                {isDeleteModalOpen && selectedPedido && (
                    <DeleteProductModal
                        product={selectedPedido}
                        totalAmount={selectedPedido.existencias}
                        onClose={() => setIsDeleteModalOpen(false)}
                    />
                )}

                <CantidadModal
                    isOpen={isCantidadModalOpen}
                    onClose={() => setCantidadModalOpen(false)}
                    onConfirm={(cantidad) => handleConfirm(cantidad)}
                    producto={selectedPedido}
                    tipo={tipoOperacion}
                />
            </div>
        </div>
    );
}
