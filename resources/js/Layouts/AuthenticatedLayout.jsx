import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { router, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const navItems = [
        { id: "dashboard", icon: "dashboard", label: "Dashboard", path: "dashboard.index" },
        { id: "inventario", icon: "inventory_2", label: "Inventario", path: "inventario.index" },
        { id: "pedidos", icon: "shopping_cart", label: "Pedidos", path: "pedidos.index" },
        { id: "ventas", icon: "point_of_sale", label: "Ventas", path: "ventas.index" },
        { id: "detalleProducto", icon: "info", label: "Detalle de Producto", path: "producto.default" },
        { id: "contactoProveedores", icon: "contacts", label: "Contacto proveedores", path: "proveedores.index" },
        { id: "entidades", icon: "category", label: "Administración", path: "entidades.index" },
    ];

    const handleMobileNavigation = (path) => {
        setShowingNavigationDropdown(false);
        router.visit(route(path));
    };

    return (
        <div className="min-h-screen bg-transparent w-full rounded-bl-lg  min-w-[82vw]">
            <nav className="border-b border-gray-100 bg-slate-200 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href={route("inventario.index")} className="flex items-center md:h-12 overflow-hidden">
                                <ApplicationLogo className="h-32 w-auto object-cover text-gray-800" />
                            </Link>
                        </div>

                        {/* Desktop User Menu */}
                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-slate-200 px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            <span className="material-icons text-gray-500 mr-2">account_circle</span>
                                            {user.name}
                                            <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("logout")} method="post" as="button">
                                        Cerrar Sesión
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Hamburger Menu (Mobile) */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-slate-800 hover:bg-slate-300 focus:outline-none transition"
                            >
                                <i className="material-icons text-2xl">menu</i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Fullscreen Menu */}
            {showingNavigationDropdown && (
                <div className="fixed inset-0 top-12 z-40 bg-slate-800 text-white flex flex-col justify-between sm:hidden">
                    <div className="pt-8 px-6 space-y-4 overflow-y-auto">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMobileNavigation(item.path)}
                                className="w-full flex items-center px-4 py-3 rounded-lg text-left font-medium hover:bg-slate-700 transition"
                            >
                                <i className="material-icons text-base mr-3">{item.icon}</i>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="border-t border-slate-600 mt-6 pt-6 pb-8 px-6">
                        <div className="mb-2">
                            <div className="text-base font-semibold">{user.name}</div>
                            <div className="text-sm text-slate-300">{user.email}</div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <button
                                onClick={() => {
                                    setShowingNavigationDropdown(false);
                                    router.visit(route("profile.edit"));
                                }}
                                className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-700 transition"
                            >
                                Perfil
                            </button>

                            <form method="post" action={route("logout")}>
                                <button
                                    type="submit"
                                    className="w-full text-left px-4 py-2 rounded-md hover:bg-slate-700 transition"
                                >
                                    Cerrar Sesión
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <main className="px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}
