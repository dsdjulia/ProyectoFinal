import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex w-full h-screen bg-slate-100 overflow-hidden">
            {/* izquierda - Logo, visible solo en md o superior */}
            <div className="hidden md:flex w-3/5 justify-center items-center bg-slate-200">
                <Link href="/">
                    <ApplicationLogo className="w-72 h-auto fill-current text-slate-500" />
                </Link>
            </div>

            {/* derecha - Login, ocupa todo el ancho en sm/md */}
            <div className="w-full md:w-2/5 flex items-center justify-center bg-slate-50 p-4 md:p-8">
                <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
