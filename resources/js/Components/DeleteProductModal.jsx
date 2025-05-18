import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { router } from "@inertiajs/react";
import { showModificableAlert } from "@/utils/alerts";

export default function DeleteProductModal({ product, totalAmount, onClose }) {
    const [reduceAmount, setReduceAmount] = useState(0);

    const handleDeleteAll = () => {
        onClose();

        router.delete(route('producto.delete'), {
            data: {
                id_producto: product.id,
                id_almacen: product.almacen_id,
                precio_unitario: product.precio_unitario
            },
            onSuccess: () => {
                showModificableAlert('Producto eliminado', `${product.nombre} eliminado del inventario.`, 'success');
                router.visit(route('inventario.index'));
            },
            onError: (error) =>
                showModificableAlert('Error al eliminar el producto', `Error: ${JSON.stringify(error)}`, 'error'),
        });
    };

    const handleDeletePartial = () => {
        if (reduceAmount <= product.cantidad_actual) {
            onClose();

            router.patch(route('producto.patch'), {
                id_almacen: product.almacen_id,
                id_producto: product.id,
                cantidad_actual: product.cantidad_actual - reduceAmount,
            }, {
                onSuccess: () => {
                    showModificableAlert('Cantidad reducida', `Cantidad de ${product.nombre} actualizada.`, 'success');
                    router.visit(route('inventario.index'));
                },
                onError: (error) =>
                    showModificableAlert('Error al reducir la cantidad del producto', `Error: ${JSON.stringify(error)}`, 'error'),
            });
        } else {
            showModificableAlert('Cantidad excedida', `La cantidad máxima a reducir es de: ${product.cantidad_actual}.`, 'warning');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-md shadow-xl p-8 w-[50vw]">
                <h2 className="text-2xl font-bold mb-6">Eliminar Producto</h2>
                <p className="mb-4">
                    ¿Deseas eliminar el producto por completo o reducir la cantidad?
                </p>
                <div className="flex flex-col">
                    <div className="mb-4">
                        <p className="text-sm text-gray-700">
                            Cantidad total disponible: <span className="font-bold">{totalAmount}</span>
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Cantidad a reducir</label>
                        <input
                            type="number"
                            min="0"
                            max={totalAmount}
                            value={reduceAmount}
                            onChange={(e) => setReduceAmount(e.target.value)}
                            className="w-1/2 border border-gray-300 rounded-lg p-2 mt-1 mr-4 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                            onClick={handleDeletePartial}
                        >
                            Reducir Cantidad
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex justify-start gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={handleDeleteAll}
                    >
                        Eliminar Todo
                    </button>
                </div>
            </div>
        </div>
    );
}
