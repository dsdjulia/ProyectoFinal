import { useState } from "react";

function NavItem({ icon, label, isExpanded, isActive, onClick }) {
  return (
    <div
      className={`flex items-center my-1 p-2 rounded-lg cursor-pointer w-full text-white font-bold hover:text-slate-600 hover:bg-slate-100
        ${isActive ? "bg-slate-600 text-slate-600" : ""}
        ${isExpanded ? "justify-start" : "justify-center"}`}
      onClick={onClick}
    >
      <i className="material-icons text-lg">{icon}</i>
      {isExpanded && <span className="ml-2 text-xs font-medium">{label}</span>}
    </div>
  );
}

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const navItems = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "inventario", icon: "inventory_2", label: "Inventario" },
    { id: "pedidos", icon: "shopping_cart", label: "Pedidos" },
    { id: "ventas", icon: "point_of_sale", label: "Ventas" },
    { id: "detalleProducto", icon: "info", label: "Detalle de Producto" },
    { id: "contactoProveedores", icon: "contacts", label: "Contacto Proveedores" },
  ];

  return (
    <div className="flex items-center justify-center bg-transparent h-screen relative">
      <div
        className={`flex flex-col bg-slate-800 transition-all duration-300 pb-3 pt-6 px-6 h-full
          ${isExpanded ? "w-60 items-start" : "w-24 items-center"} `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Ítems */}
        <div className="flex flex-col flex-1 w-full gap-1 justify-start">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isExpanded={isExpanded}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </div>

        {/* Configuración */}
        <div className="mb-2 w-full">
          <NavItem
            icon="settings"
            label="Configuración"
            isExpanded={isExpanded}
            isActive={activeItem === "settings"}
            onClick={() => setActiveItem("settings")}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
