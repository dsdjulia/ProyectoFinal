import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {

    const productos = props.productos;


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-semibold">Productos</h1>

                            {productos.map((producto) => (
                                <div key={producto.id} className="flex items-center justify-between mt-4 bg-slate-100 rounded p-3">
                                    <div>
                                        <p className="text-lg font-semibold">{producto.nombre}</p>
                                        <p className="text-sm text-gray-600">{producto.descripcion}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold">{producto.precio_unitario} €</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
