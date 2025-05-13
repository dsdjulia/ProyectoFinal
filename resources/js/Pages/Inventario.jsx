// resources/js/Pages/Inventario/Index.jsx
import Sidebar from "@/Components/Sidebar";
import Main from "@/Components/Main";
import Header from "@/Components/Header";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index() {
    const { props } = usePage();
    console.log(props);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Lista de productos
                </h2>
            }
        >
            <div className="flex flex-col w-full">
                <div className="flex w-full bg-slate-100">
                    <div className="sticky top-0 h-screen">
                        <Sidebar />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <Main props={props} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
