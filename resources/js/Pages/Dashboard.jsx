// resources/js/Pages/Dashboard/Index.jsx
import Sidebar from "@/Components/Sidebar";
import Main from "@/Components/Main";
import Header from "@/Components/Header";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

export default function Index() {
    const { props } = usePage();
    console.log(props);

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full bg-slate-100">
                <div className="sticky top-0 left-0 h-screen">
                    <Sidebar />
                </div>
                <AuthenticatedLayout>
                    <div className=" overflow-y-auto bg-slate-100">
                        <Main props={props} />
                    </div>
                    <Footer />
                </AuthenticatedLayout>
            </div>
        </div>
    );
}
