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
    <div className="bg-transparent mt-4 rounded shadow-sm w-full">
      <div className="p-4 flex justify-end">
        <div className="relative flex items-center bg-slate-200 rounded-full text-white">
          <input
            type="text"
            placeholder="Buscar producto"
            className="flex-1 bg-slate-200 text-white pl-4 pr-10 py-2 rounded-full focus:outline-none focus:ring "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-2 bg-transparent text-slate-400 flex align-center justify-center p-2 rounded-full ">
            <span className="material-icons w-5 h-5">search</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-center"></th>
              <th className="p-3 text-center">Codigo</th>
              <th className="p-3 text-center">Producto</th>
              <th className="p-3 text-center">Precio</th>
              <th className="p-3 text-center">Existencias</th>
              <th className="p-3 text-center">Editar</th>
              <th className="p-3 text-center">Eliminar</th>
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
