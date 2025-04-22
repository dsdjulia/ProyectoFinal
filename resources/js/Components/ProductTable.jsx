"use client";

import { useState } from "react";
import ProductTableRow from "./ProductTableRow";

export default function ProductTable() {
    const [products, setProducts] = useState([
        {
            imagen: "https://png.pngtree.com/png-clipart/20240703/original/pngtree-children-clothing-flat-round-circle-vector-icon-png-image_15477247.png",
            codigo: "2123",
            producto: "ARROZ BLANQUITA",
            precio: "$ 1,000",
            existencias: "1188",
            fecha: "12-02-2025",
            status: "cancelado",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/1043/1043940.png",
            codigo: "1122",
            producto: "UNIDAD CHOCOLATE LUKER",
            precio: "$ 1,500",
            existencias: "4996",
            fecha: "14-04-2025",
            status: "recibido",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/1043/1043940.png",
            codigo: "2987",
            producto: "MAIZENA",
            precio: "$ 2,300",
            existencias: "228",
            fecha: "08-02-2025",
            status: "recibido",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/316/316325.png",
            codigo: "2431",
            producto: "AZUCAR MORENA",
            precio: "$ 2,500",
            existencias: "198",
            fecha: "20-12-2024",
            status: "pendiente",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/1043/1043940.png",
            codigo: "1210",
            producto: "MAIZ AMARILLO",
            precio: "$ 2,000",
            existencias: "199",
            fecha: "31-01-2025",
            status: "recibido",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="bg-white shadow-slate-300 shadow-md rounded-lg overflow-hidden">
            <div className="flex justify-between items-center mb-4 p-6">
                <h2 className="text-xl font-semibold text-gray-700">
                    Purchase Order
                </h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    New
                </button>
            </div>

            <div className="flex justify-between items-center mb-4 px-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded-lg py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Encabezados */}
            <div className="grid grid-cols-8 items-center bg-slate-100 font-semibold text-gray-700 py-2 px-8 gap-2 mb-6 mt-10">
                <div className="text-center">Imagen</div>
                <div className="text-left">ID Producto</div>
                <div className="text-left">Artículo</div>
                <div className="text-center">Precio</div>
                <div className="text-center">Cantidad</div>
                <div className="text-center">Fecha Recepción</div>
                <div className="text-center">Estado</div>
                <div className="text-center">Acciones</div>
            </div>

            {/* Filas */}
            <div className="grid grid-cols-1 px-4 pb-4">
                {products
                    .filter((product) =>
                        product.producto
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
                    .map((product, index) => (
                        <ProductTableRow key={index} product={product} />
                    ))}
            </div>
        </div>
    );
}
