import { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import AddModal from "./AddModal";
import DeleteProductModal from "./DeleteProductModal";
import { router } from "@inertiajs/react";

export default function OrdenesCompra({ props }) {
    const [products, setProducts] = useState(props.all_productos);
    const [almacenes, setAlmacenes] = useState(props.data);
    const [categorias, setCategorias] = useState(props.categorias);
    const [proveedores, setProveedores] = useState(props.all_proveedores);
    const [compras, setCompras] = useState(props.detalles_compras);// pintar compras

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="w-full flex flex-col align-middle justify-start p-12 pt-0npm r pb-34 h-full">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mt-4">
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

                <div className="grid grid-cols-8 items-center bg-slate-100 font-semibold text-gray-700 py-2 px-8 gap-2 mb-6 mt-4">
                    <div className="text-start">ID Producto</div>
                    <div className="text-start pl-4 col-span-2">Artículo</div>
                    <div className="text-center">Precio</div>
                    <div className="text-center">Cantidad</div>
                    <div className="text-center">Estado</div>
                    <div className="text-center">Fecha Recepción</div>
                    <div className="text-center">Acciones</div>
                </div>

                <div className="grid grid-cols-1 px-4 pb-4">
                    {products
                        .filter((product) =>
                            product.nombre
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((product, index) => (
                            <ProductTableRow
                                key={index}
                                product={product}
                                context="orders"
                                almacenes={almacenes}
                                onDelete={() => handleDeleteProduct(product)}
                            />
                        ))}
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
