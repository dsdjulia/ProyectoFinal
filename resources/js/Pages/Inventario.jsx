// resources/js/Pages/Inventario/Index.jsx
import Sidebar from "@/Components/Sidebar";
import Main from "@/Components/Main";
import Header from "@/Components/Header";
import { usePage } from "@inertiajs/react";

export default function Index() {

    // const { props } = usePage();
    const props = usePage().props;
    console.log(props);

    return (
        <div className="flex flex-col w-full">
            <Header />
            <div className="flex w-full bg-slate-100">
                <div className="sticky top-0 h-screen">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-auto">
                    <Main />
                </div>
            </div>
        </div>
    );
}
