import { useState } from "react";
import { router } from "@inertiajs/react";

function NavItem({ icon, label, routePath, isExpanded, isActive, onClick }) {
  return (
    <div
      className={`flex items-center my-1 p-2 rounded-lg cursor-pointer w-full font-bold
        ${isActive ? "bg-white text-slate-800" : "text-white hover:bg-slate-100 hover:text-slate-800"}
        ${isExpanded ? "justify-start" : "justify-center"}`}
      onClick={onClick}
    >
      <i className="material-icons text-lg">{icon}</i>
      {isExpanded && <span className="ml-2 text-xs font-medium">{label}</span>}
    </div>
  );
}

export function Sidebar({ active }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard", path: "/inventario" },
    { id: "inventario", icon: "inventory_2", label: "Inventario", path: "routes.inventario"},
    { id: "pedidos", icon: "shopping_cart", label: "Pedidos", path: "/inventario" },
    { id: "ventas", icon: "point_of_sale", label: "Ventas", path: "/inventario" },
    { id: "detalleProducto", icon: "info", label: "Detalle de Producto", path: "/producto" },
    { id: "contactoProveedores", icon: "contacts", label: "Contacto Proveedores", path: "/inventario" },
  ];

  const handleNavigation = (path) => {
    if (window.location.pathname !== path) {
      router.visit(path);
    }
  };

  return (
    <div className="flex items-center justify-center bg-transparent h-screen relative">
      <div
        className={`flex flex-col bg-slate-800 transition-all duration-300 pb-3 pt-6 px-6 h-full
          ${isExpanded ? "w-60 items-start" : "w-24 items-center"} `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col flex-1 w-full gap-2 justify-start ">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              routePath={item.path}
              isExpanded={isExpanded}
              isActive={active === item.id}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>


      </div>
    </div>
  );
}

export default Sidebar;
