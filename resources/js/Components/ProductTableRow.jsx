"use client";

import { useState } from "react";
import Chip from "@/Components/Chip";
import EditProductModal from "@/Components/EditProductModal";
import DeleteProductModal from "@/Components/DeleteProductModal";

export default function ProductTableRow({
    product,
    context,
    almacenes = [],
    onUpdate,
    categorias = [],
    proveedores = [],
    onDelete,
    onCantidadClick, // ✅ nuevo prop para abrir modal de cantidad
}) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    console.log(product);

    const handleEditSave = (updatedData) => {
        if (onUpdate) {
            onUpdate({ ...product, ...updatedData });
        }
        setEditModalOpen(false);
    };

    return (
        <>
            <div
                className="relative group grid grid-cols-8 items-center bg-white rounded-sm border border-slate-200 p-2 gap-4 hover:px-1 hover:border-slate-600 hover:border-2 transition-all cursor-pointer"
                title="Ver detalle del producto"
            >
                {/* Código */}
                <div className="text-gray-700 font-semibold text-left pl-2">
                    {product.codigo}
                </div>

                {/* Nombre con tooltip */}
                <div className="relative group flex items-center col-span-2">
                    <span className="text-gray-800 font-bold truncate w-full text-left">
                        {product.nombre}
                    </span>
                    <div className="absolute top-6 left-6 max-w-xs bg-slate-700 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 overflow-hidden text-ellipsis whitespace-nowrap">
                        {product.nombre}
                    </div>
                </div>

                {/* Precio */}
                <div className="text-gray-700 text-center">
                    {product.precio_unitario} €
                </div>

                {/* Cantidad */}
                <div className="text-gray-700 text-center">
                    {product.cantidad_actual}
                </div>

                {/* Estado o almacén */}
                <div className="text-gray-700 text-center">
                    {context === "orders" ? (
                        <Chip status={!!product.estado}/>
                    ) : (
                        <span>{product.almacen_nombre || "Sin asignar"}</span>
                    )}
                </div>

                {/* Fecha */}
                <div className="text-gray-700 text-center">
                    {product.fecha_entrada ?? product.fecha_compra}
                </div>

                {/* Acciones */}
                <div className="flex justify-center gap-4 items-center">
                    {/* Editar */}
                    <div
                        className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:text-slate-700 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditModalOpen(true);
                        }}
                        title="Editar producto"
                    >
                        <span className="material-icons">edit</span>
                    </div>

                    {/* Eliminar */}
                    <div
                        className="flex items-center justify-center text-red-400 w-8 h-8 rounded-full hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeleteModalOpen(true);
                        }}
                        title="Eliminar producto"
                    >
                        <span className="material-icons">delete</span>
                    </div>

                    {/* Vender o Recibir */}
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
                            context === "orders"
                                ? "text-blue-500 hover:text-blue-600"
                                : "text-green-500 hover:text-green-600"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onCantidadClick) {
                                onCantidadClick(
                                    context === "orders" ? "recepcion" : "venta",
                                    product
                                );
                            }
                        }}
                        title={
                            context === "orders"
                                ? "Marcar como recibido"
                                : "Vender producto"
                        }
                    >
                        <span className="material-icons">
                            {context === "orders" ? "inventory_2" : "sell"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal de edición */}
            {isEditModalOpen && (
                <EditProductModal
                    product={product}
                    context={context}
                    almacenes={almacenes}
                    categorias={categorias}
                    producto={product}
                    proveedores={proveedores}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleEditSave}
                />
            )}

            {/* Modal de eliminación */}
            {isDeleteModalOpen && (
                <DeleteProductModal
                    product={product}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={onDelete}
                />
            )}
        </>
    );
}
