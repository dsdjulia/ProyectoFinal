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
            fecha:"12-02-2025" ,
            status: "cancelado",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/1043/1043940.png",
            codigo: "1122",
            producto: "UNIDAD CHOCOLATE LUKER",
            precio: "$ 1,500",
            existencias: "4996",
            fecha:"14-04-2025" ,
            status: "recibido",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/1043/1043940.png",
            codigo: "2987",
            producto: "MAIZENA",
            precio: "$ 2,300",
            existencias: "228",
            fecha:"08-02-2025" ,
            status: "recibido",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/316/316325.png",
            codigo: "2431",
            producto: "AZUCAR MORENA",
            precio: "$ 2,500",
            existencias: "198",
            fecha:"20-12-2024" ,
            status: "pendiente",
        },
        {
            imagen: "https://cdn-icons-png.flaticon.com/512/1043/1043940.png",
            codigo: "1210",
            producto: "MAIZ AMARILLO",
            precio: "$ 2,000",
            existencias: "199",
            fecha:"31-01-2025" ,
            status: "recibido",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="bg-white shadow rounded-3xl overflow-hidden">
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
                <div>
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
                            <span className="material-icons">filter_alt</span>
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
                            <span className="material-icons">sort</span>
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
                            <span className="material-icons">settings</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse mt-4">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="p-4 border-b text-center"></th>
                            <th className="p-4 border-b text-stqart">ID Producto</th>
                            <th className="p-4 border-b text-start pr-24">Artículo</th>
                            <th className="p-4 border-b text-center">Precio</th>
                            <th className="p-4 border-b text-center">Cantidad</th>
                            <th className="p-4 border-b text-center">Fecha Recepción</th>
                            <th className="p-4 border-b text-center">Estado</th>
                            <th className="p-4 border-b text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products
                            .filter((product) =>
                                product.producto
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            .map((product, index) => (
                                <ProductTableRow
                                    key={index}
                                    product={product}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
