import { useState } from "react";
import {Link, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";


export default function DeleteProductModal({ product, onClose }) {
    const [reduceAmount, setReduceAmount] = useState(0);

    const handleDeleteAll = () => {
        console.log(`Eliminando el producto: ${product.producto}`);
        
        //! De momento no tiene el id
        Inertia.delete(`muestra/${product.id}`, {
            onSuccess: () => {
            },
            onError: (error) => showModificableAlert('Error al eliminar el producto', `Error: ${error}`, 'error'),
        });
        onClose();
    };

    const handleDeletePartial = () => {
        console.log(`Reduciendo ${reduceAmount} de: ${product.producto}`);
        Inertia.delete(`muestra/${product.codigo}/${reduceAmount}`, {
            onSuccess: () => {
                showModificableAlert('Producto eliminado', `${product.producto} eliminado del inventario.`, 'success')
            },
            onError: (error) => showModificableAlert('Error al reducir la cantidad', `Error: ${error}`, 'error'),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-slate-700 text-white rounded-md shadow-xl p-8 w-[50vw]">
                <h2 className="text-2xl font-bold mb-6 text-slate-100">Eliminar Producto</h2>
                <p className="mb-4 text-slate-300">
                    ¿Deseas eliminar el producto por completo o reducir la cantidad?
                </p>
                <div className="flex flex-col">
                    <div>
                        <label className="block text-sm font-medium text-slate-300">Cantidad a Reducir</label>
                        <input
                            type="text"
                            value={reduceAmount}
                            onChange={(e) => setReduceAmount(e.target.value)}
                            className="w-1/2 border border-slate-600 rounded-lg p-2 mt-1 mr-4 bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-100"
                        />
                        <button
                        className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600"
                        onClick={handleDeletePartial}
                    >
                        Reducir Cantidad
                    </button>
                    </div>
                </div>
                <div className="mt-6 flex justify-start gap-2">
                    <button
                        className="px-4 py-2 bg-slate-600 text-slate-300 rounded-md hover:bg-slate-500"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 "
                        onClick={handleDeleteAll}
                    >
                        Eliminar Todo
                    </button>

                </div>
            </div>
        </div>
    );
}
