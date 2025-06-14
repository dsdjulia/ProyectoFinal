import { useState, useEffect } from "react";
import ProductTableRow from "../ProductTableRow";
import CarruselAlmacenes from "../CarruselAlmacenes";
import AddModal from "../Modales/AddModal";
import DeleteProductModal from "../Modales/DeleteProductModal";
import CantidadModal from "../Modales/CantidadModal";
import DoughnutChart from "../DoughnutChart";
import AddAlmacenModal from "../Modales/AddAlmacenModal";
import { router } from "@inertiajs/react";

export default function InventarioTabla({ props }) {
    const [almacenes, setAlmacenes] = useState(props.data ?? []);
    const [products, setProducts] = useState(props.all_productos ?? []);
    const [categorias, setCategorias] = useState(props.categorias ?? []);
    const [proveedores, setProveedores] = useState(props.all_proveedores ?? []);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlmacenModalOpen, setIsAlmacenModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selected, setSelected] = useState([]);

    const [isCantidadModalOpen, setCantidadModalOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = useState("");

    const [pagActual, setpagActual] = useState(1);
    const [cantPag, setcantPag] = useState(1); // Se ajusta dinámicamente
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        const filtrados = props.all_productos.filter(
            (product) =>
                product.nombre
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) && // Filtramos los productos por nombre
                (selected.length === 0 || selected.includes(product.id_almacen)) // Filtramos por almacén si procede
        );

        setProductosFiltrados(filtrados);
        setcantPag(Math.ceil(filtrados.length / 10)); // Calculamos la nueva cantidad de páginas
        setpagActual(1); // Vuelvo a la primera pagina cuando cambio el filtro
    }, [searchTerm, selected, props.all_productos]);

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
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const handleCantidadConfirm = (cantidad) => {
        if (!selectedProduct || !tipoOperacion) return;

        router.post("/productos/actualizar-stock", {
            producto_id: selectedProduct.id,
            cantidad,
            tipo: tipoOperacion,
        });

        setCantidadModalOpen(false);
    };

    const limpiarFiltros = () => {
        setSearchTerm("");
        setSelected([]);

        router.visit(route("inventario.index"), {
            method: "get",
            onSuccess: (page) => {
                setSelected([]);
                setAlmacenes(page.props.data);
            },
            preserveState: true,
            preserveScroll: true,
            only: ["data"],
        });
    };

    if (!almacenes || almacenes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center gap-6 relative z-10 pb-32 h-screen">
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
        <div className="flex flex-col p-4 sm:p-12 pt-12 pb-34 h-full">
            {/* Summary + Doughnut Chart (Responsive) */}
            <div className="flex flex-col sm:flex-row justify-start sm:mb-12 gap-6 sm:gap-0 w-full">
                <div className="flex items-center border-r sm:border-r justify-start w-full sm:w-1/3">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                            <span className="material-icons text-blue-500 text-2xl">
                                euro
                            </span>
                        </div>
                        <div className="flex flex-col pl-4 justify-center">
                            <p className="mt-2 text-gray-500 text-sm">
                                PRECIO TOTAL INVENTARIO
                            </p>
                            <p className="text-xl font-bold text-gray-800">
                                {props.total_precio.toFixed(2)}€
                            </p>
                        </div>
                    </div>
                </div>
                <div className="hidden flex-col sm:flex-row items-center gap-6 sm:flex">
                    <DoughnutChart
                        inStock={props.disponible}
                        lowStock={props.lowStock}
                        outOfStock={props.agotado}
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-lg font-semibold text-gray-800">
                            {props.total_productos} producto
                            {props.total_productos !== 1 ? "s" : ""}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
                            <span className="text-sm text-gray-500">
                                <span className="w-3 h-3 inline-block rounded-full bg-teal-500 mr-2"></span>
                                Disponible:{" "}
                                <span className="font-medium">
                                    {props.disponible}
                                </span>
                            </span>
                            <span className="text-sm text-gray-500">
                                <span className="w-3 h-3 inline-block rounded-full bg-orange-500 mr-2"></span>
                                Stock bajo:{" "}
                                <span className="font-medium">
                                    {props.lowStock}
                                </span>
                            </span>
                            <span className="text-sm text-gray-500">
                                <span className="w-3 h-3 inline-block rounded-full bg-red-500 mr-2"></span>
                                Agotado:{" "}
                                <span className="font-medium">
                                    {props.agotado}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buscar */}
                <div className="flex flex-col justify-start items-left gap-2 mb-5">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="border border-gray-300 rounded-lg py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-slate-500 mb-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div>
                        <button className="mr-2 bg-slate-600 text-slate-50 px-4 py-1 rounded-md text-sm hover:bg-slate-700 hover:text-white">
                            Buscar
                        </button>
                        <button
                            className="mr-2 bg-red-100 text-red-600 px-4 py-1 rounded-md text-sm hover:bg-red-400 hover:text-white transition"
                            onClick={limpiarFiltros}
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>

                {/* Carrusel y botón Añadir Almacén */}
                <div className="sm:flex justify-between items-center mb-4 hidden ">
                    <CarruselAlmacenes
                        arrayAlmacenes={almacenes}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>

            {/* Carrusel en escritorio / tabla en móvil */}
            <div className="mb-4">
                <div className="block sm:hidden mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Filtrar por almacenes:
                    </label>
                    <select
                        multiple
                        value={selected}
                        onChange={(e) => {
                            const selectedOptions = Array.from(
                                e.target.selectedOptions
                            ).map((option) => parseInt(option.value));
                            setSelected(selectedOptions);
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 h-40"
                    >
                        {almacenes.map((almacen) => (
                            <option key={almacen.id} value={almacen.id}>
                                {almacen.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Productos - Tabla (desktop) o Tarjetas (móvil) */}
            <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Inventario
                </h2>

                <div className="hidden sm:grid grid-cols-8 items-center bg-slate-100 font-semibold text-gray-700 py-2 px-8 gap-2 mt-8 mb-4">
                    <div className="text-start">Código Producto</div>
                    <div className="text-start pl-4 col-span-2">Artículo</div>
                    <div className="text-center">Precio</div>
                    <div className="text-center">Cantidad</div>
                    <div className="text-center">Almacén</div>
                    <div className="text-center">Fecha Recepción</div>
                    <div className="text-center">Acciones</div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-0 px-2 sm:px-4">
                    {products.map((product, index) => (
                        <div key={index} className="sm:contents">
                            {/* Tarjeta para móvil */}

                            {console.log(product)}
                            <div className="block sm:hidden border rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-gray-600">
                                    <strong>Artículo:</strong> {product.nombre}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Precio:</strong> {product.precio_unitario}€
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Cantidad:</strong>{" "}
                                    {product.cantidad_actual}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Almacén:</strong>{" "}
                                    {product.almacen_nombre}
                                </p>

                                <div className="flex justify-around flex-wrap gap-2 mt-4">

                                    <button
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setSelectedProduct(product);
                                        }}
                                        className="flex items-center gap-1 text-md text-slate-700 px-3 py-1 rounded"
                                    >
                                        <span className="material-icons text-md">
                                            edit
                                        </span>{" "}

                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteProduct(product)
                                        }
                                        className="flex items-center gap-1 text-md text-red-400 px-3 py-1 rounded"
                                    >
                                        <span className="material-icons text-md">
                                            delete
                                        </span>{" "}

                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setTipoOperacion("vender");
                                            setCantidadModalOpen(true);
                                        }}
                                        className="flex items-center gap-1 text-md text-green-400 px-3 py-1 rounded"
                                    >
                                        <span className="material-icons text-md">
                                            sell
                                        </span>{" "}

                                    </button>
                                </div>
                            </div>

                            {/* Fila completa para escritorio */}
                            <div className="hidden sm:block">
                                <ProductTableRow
                                    product={product}
                                    context="stock"
                                    props={props}
                                    almacenes={almacenes}
                                    categorias={categorias}
                                    proveedores={proveedores}
                                    clickable={true}
                                    onDelete={() =>
                                        handleDeleteProduct(product)
                                    }
                                    onCantidadClick={(tipo) => {
                                        setSelectedProduct(product);
                                        setTipoOperacion(tipo);
                                        setCantidadModalOpen(true);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
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
                        disabled={pagActual === cantPag || cantPag === 0}
                        className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                        <span className="material-icons text-gray-700">
                            chevron_right
                        </span>
                    </button>
                </div>
            </div>

            {/* Modales */}
            <AddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddProduct}
                context="stock"
                almacenes={almacenes}
                categorias={categorias}
                proveedores={proveedores}
            />

            {isDeleteModalOpen && selectedProduct && (
                <DeleteProductModal
                    product={selectedProduct}
                    totalAmount={selectedProduct.existencias}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            )}

            <CantidadModal
                isOpen={isCantidadModalOpen}
                onClose={() => setCantidadModalOpen(false)}
                onConfirm={handleCantidadConfirm}
                producto={selectedProduct}
                clientes={props.all_clientes}
                tipo={tipoOperacion}
            />

            <AddAlmacenModal
                isOpen={isAlmacenModalOpen}
                onClose={() => setIsAlmacenModalOpen(false)}
                onAdd={handleAddAlmacen}
            />
        </div>
    );
}
