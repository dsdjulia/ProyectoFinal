import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard(props) {

    const redondeo = (precio, decimales) => {
        const factor = Math.pow(10, decimales);
        return Math.round(precio * factor) / factor;
    };

    const productos = props.productos;
    const precio_medio = redondeo(props.precio_medio, 2);
    const precio_total = props.precio_total;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Lista de productos
                </h2>
            }
        >
        



        </AuthenticatedLayout>
    );
}
