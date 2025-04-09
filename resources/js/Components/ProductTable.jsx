"use client";

import { useState } from "react";
import ProductTableRow from "./ProductTableRow";

export default function ProductTable() {
  const [products, setProducts] = useState([
    { codigo: "2123", producto: "ARROZ BLANQUITA", precio: "$ 1,000", existencias: "1188" },
    { codigo: "1122", producto: "UNIDAD CHOCOLATE LUKER", precio: "$ 1,500", existencias: "4996" },
    { codigo: "2987", producto: "MAIZENA", precio: "$ 2,300", existencias: "228" },
    { codigo: "2431", producto: "AZUCAR MORENA", precio: "$ 2,500", existencias: "198" },
    { codigo: "1210", producto: "MAIZ AMARILLO", precio: "$ 2,000", existencias: "199" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white mt-4 rounded shadow-sm">
      <div className="p-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Buscar producto"
            className="flex-1 border p-2 rounded-l"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#3498db] text-white px-3 py-2 rounded-r flex items-center justify-center">
            <span className="material-icons w-5 h-5">search</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Codigo</th>
              <th className="p-3">Producto</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Existencias</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.producto.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product, index) => (
                <ProductTableRow key={index} product={product} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
