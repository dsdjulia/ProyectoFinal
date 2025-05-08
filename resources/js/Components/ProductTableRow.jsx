"use client";

import { useState } from "react";
import Chip from "@/Components/Chip";
import EditProductModal from "@/Components/EditProductModal";
import DeleteProductModal from "@/Components/DeleteProductModal";

export default function ProductTableRow({ product, context, almacenes = [], onUpdate }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleRowClick = () => {
        console.log(`Selected: ${product.producto}`);
    };

    const handleEditSave = (updatedData) => {
        if (onUpdate) {
            onUpdate({ ...product, ...updatedData });
        }
        setEditModalOpen(false);
    };

    return (
        <>
            <div
                className="grid grid-cols-9 items-center bg-white rounded-sm border border-slate-200 p-4 gap-4 hover:px-2 transition-all cursor-pointer"
                onClick={handleRowClick}
            >
                {/* Imagen */}
                <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            src={product.imagen}
                            alt={product.nombre}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Código */}
                <div className="text-gray-700 font-semibold text-left pl-2">
                    {product.codigo}
                </div>

                {/* Nombre del producto con tooltip */}
                <div className="relative group flex items-center col-span-2">
                    <span className="text-gray-800 font-bold truncate w-full text-left">
                        {product.nombre}
                    </span>
                    <div className="absolute top-6 left-6 max-w-xs bg-gray-700 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.nombre}
                    </div>
                </div>

                {/* Precio */}
                <div className="text-gray-700 text-center">{product.precio_unitario} €</div>

                {/* Existencias */}
                <div className="text-gray-700 text-center">{product.cantidad_actual}</div>

                {/* Estado */}
                <div className="text-gray-700 text-center">
                    {context === "orders" ? (
                        <Chip status={product.estado || "false"} />
                    ) : (
                        <span>{product.almacen || "Sin asignar"}</span>
                    )}
                </div>

                {/* Fecha */}
                <div className="text-gray-700 text-center">{product.fecha_entrada}</div>

                {/* Acciones */}
                <div className="flex justify-center gap-8 items-center">
                    <div
                        className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:text-slate-700 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditModalOpen(true);
                        }}
                    >
                        <span className="material-icons">edit</span>
                    </div>
                    <div
                        className="flex items-center justify-center text-red-400 w-8 h-8 rounded-full hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModalOpen(true);
                        }}
                    >
                        <span className="material-icons">delete</span>
                    </div>
                </div>
            </div>

            {/* Modales */}
            {isEditModalOpen && (
                <EditProductModal
                    product={product}
                    context={context}
                    almacenes={almacenes}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleEditSave}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteProductModal
                    product={product}
                    onClose={() => setDeleteModalOpen(false)}
                />
            )}
        </>
    );
}
