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
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    { id: "home", icon: "home", label: "Inicio" },
    { id: "allReports", icon: "description", label: "Todos los Reportes" },
    { id: "breakdown", icon: "bar_chart", label: "Desglose" },
    { id: "engagement", icon: "thumb_up", label: "Engagement" },
    { id: "popularity", icon: "trending_up", label: "Popularidad" },
    { id: "loyalty", icon: "favorite", label: "Lealtad" },
    { id: "growth", icon: "show_chart", label: "Crecimiento" },
    { id: "trends", icon: "insights", label: "Tendencias" },
    { id: "listBuilding", icon: "list_alt", label: "List Building" },
    { id: "personas", icon: "people", label: "Personas" },
  ];

  return (
    <div className="flex items-center justify-center bg-transparent h-screen mr-12">
      <div
        className={`flex flex-col bg-slate-800 transition-all duration-300 pb-3 pt-6 px-6 h-full mr-2
          ${isExpanded ? "w-60 items-start" : "w-24 items-center"} `}
      >
        {/* Contenedor de ítems apilados */}
        <div className="flex flex-col flex-1 w-full gap-1 justify-start ">
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

        {/* Ítem de Configuración separado */}
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
        {/* Botón de expansión */}
        <div
          className=" shadow-[0_5px_16px_0px_#3981F733] h-6 w-6 flex items-center justify-center rounded-full bg-slate-700 cursor-pointer text-white hover:text-slate-100 hover:bg-slate-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <i className="material-icons text-xs">chevron_left</i>
          ) : (
            <i className="material-icons text-xs">chevron_right</i>
          )}
      </div>
    </div>
  );
}

export default Sidebar;
