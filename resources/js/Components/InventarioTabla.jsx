import { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import CarruselAlmacenes from "./CarruselAlmacenes";
import AddModal from "./AddModal";
import DeleteProductModal from "./DeleteProductModal";
import DoughnutChart from "./DoughnutChart";
import { router } from "@inertiajs/react";

export default function InventarioTabla({ props }) {
    const [products, setProducts] = useState(props.all_productos);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selected, setSelected] = useState([]);
    const [almacenes, setAlmacenes] = useState(props.data);
    const [categorias, setCategorias] = useState(props.categorias);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const limpiarFiltros = () => {
        setSearchTerm('');
        setSelected([]);

        router.visit(route('inventario.index'), {
            method: 'get',
            onSuccess: (page) => {
                setSelected([]);
                setAlmacenes(page.props.data);
            },
            preserveState: true,
            preserveScroll: true,
            only: ['data'],
        });
    };

    return (
        <div className="w-full flex flex-col align-middle justify-start p-12 pt-0 pb-34">
            {/* Top Section */}
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

            {/* Table Section */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 relative flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Inventario</h2>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-6 right-6 bg-slate-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-slate-600"
                >
                    Añadir Producto
                </button>

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

                <div className="text-right text-sm text-gray-500 mb-2">
                    <CarruselAlmacenes
                        arrayAlmacenes={almacenes}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </div>

                <div className="grid grid-cols-8 items-center bg-slate-100 font-semibold text-gray-700 py-2 px-8 gap-2 mt-8 mb-4">
                    <div className="text-start">ID Producto</div>
                    <div className="text-start pl-4 col-span-2">Artículo</div>
                    <div className="text-center">Precio</div>
                    <div className="text-center">Cantidad</div>
                    <div className="text-center">Almacén</div>
                    <div className="text-center">Fecha Recepción</div>
                    <div className="text-center">Acciones</div>
                </div>

                <div className="grid grid-cols-1 px-4 pb-4">
                    {products
                        .filter((product) =>
                            product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((product, index) => (
                            <ProductTableRow
                                key={index}
                                product={product}
                                context="stock"
                                almacenes={almacenes}
                                onDelete={() => handleDeleteProduct(product)}
                            />
                        ))}
                </div>

                <AddModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddProduct}
                    context="stock"
                    almacenes={almacenes}
                    categorias={categorias}
                />

                {isDeleteModalOpen && selectedProduct && (
                    <DeleteProductModal
                        product={selectedProduct}
                        totalAmount={selectedProduct.existencias}
                        onClose={() => setIsDeleteModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
