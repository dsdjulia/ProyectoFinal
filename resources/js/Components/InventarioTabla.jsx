import { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import CarruselAlmacenes from "./CarruselAlmacenes";
import AddModal from "./AddModal";
import DeleteProductModal from "./DeleteProductModal";
import CantidadModal from "./CantidadModal";
import DoughnutChart from "./DoughnutChart";
import AddAlmacenModal from "./AddAlmacenModal";
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

    console.log(props);

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
            <div className="flex flex-col items-center justify-center h-[80vh] text-center gap-6">
                <span className="material-icons text-slate-400 text-7xl">warehouse</span>
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
        <div className="w-full flex flex-col align-middle justify-start p-12 pt-0 pb-34 mt-12">
            {/* Top Summary */}
            <div className="flex justify-start mb-12 w-full">
                <div className="flex items-center border-r justify-start align-middle w-1/3">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                            <span className="material-icons text-blue-500 text-2xl">euro</span>
                        </div>
                        <div className="flex flex-col pl-4 justify-center">
                            <p className="mt-2 text-gray-500 text-sm">PRECIO TOTAL INVENTARIO</p>
                            <p className="text-xl font-bold text-gray-800">
                                {props.total_precio.toFixed(2)}€
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="pl-12">
                        <DoughnutChart
                            inStock={props.disponible}
                            lowStock={props.lowStock}
                            outOfStock={props.agotado}
                        />
                    </div>
                    <div className="flex flex-col pl-6 justify-center relative">
                        <p className="text-lg font-semibold text-gray-800">
                            {props.total_productos} producto{props.total_productos !== 1 ? "s" : ""}
                        </p>
                        <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-teal-500 mr-2"></span>
                                <p className="text-sm text-gray-500">
                                    Disponible: <span className="text-gray-800 font-medium">{props.disponible}</span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                                <p className="text-sm text-gray-500">
                                    Stock bajo: <span className="text-gray-800 font-medium">{props.lowStock}</span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                                <p className="text-sm text-gray-500">
                                    Agotado: <span className="text-gray-800 font-medium">{props.agotado}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inventario Table Section */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 relative flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Inventario</h2>

                {/* Buscar */}
                <div className="flex flex-col justify-start items-left gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="border border-gray-300 rounded-lg py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div>
                        <button className="mr-2 bg-slate-300 text-slate-600 px-4 py-2 rounded-md font-semibold hover:bg-slate-400 hover:text-white">
                            Buscar
                        </button>
                        <button
                            className="hover:underline text-sm text-red-400"
                            onClick={limpiarFiltros}
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>

                {/* Carrusel y botón Añadir Almacén */}
                <div className="flex justify-between items-center mb-4">
                    <CarruselAlmacenes
                        arrayAlmacenes={almacenes}
                        selected={selected}
                        setSelected={setSelected}
                    />

                </div>

                {/* Cabecera tabla */}
                <div className="grid grid-cols-8 items-center bg-slate-100 font-semibold text-gray-700 py-2 px-8 gap-2 mt-8 mb-4">
                    <div className="text-start">ID Producto</div>
                    <div className="text-start pl-4 col-span-2">Artículo</div>
                    <div className="text-center">Precio</div>
                    <div className="text-center">Cantidad</div>
                    <div className="text-center">Almacén</div>
                    <div className="text-center">Fecha Recepción</div>
                    <div className="text-center">Acciones</div>
                </div>

                {/* Filas */}
                <div className="grid grid-cols-1 px-4 pb-4">
                    {products
                        .filter((product) =>
                            product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((product, index) => (
                            <ProductTableRow
                                key={index}
                                product={selectedProduct}
                                context="stock"
                                props={props}
                                almacenes={almacenes}
                                categorias={categorias}
                                onDelete={() => handleDeleteProduct(product)}
                                onCantidadClick={(tipo) => {
                                    setSelectedProduct(product);
                                    setTipoOperacion(tipo);
                                    setCantidadModalOpen(true);
                                }}
                            />
                        ))}
                </div>

                {/* Modals */}
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
                    tipo={tipoOperacion}
                />

                <AddAlmacenModal
                    isOpen={isAlmacenModalOpen}
                    onClose={() => setIsAlmacenModalOpen(false)}
                    onAdd={handleAddAlmacen}
                />
            </div>
        </div>
    );
}
