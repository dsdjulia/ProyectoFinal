function SidebarItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center p-3 ${active ? "bg-gray-700 cursor-pointer" : "hover:bg-gray-700 cursor-pointer"}`}>
      <div className="mr-3">{icon}</div>
      <div>{label}</div>
      {active && (
        <div className="ml-auto">
          <a className="bg-green-500 text-white text-xs px-2 py-1 rounded">
            {label === "Productos"
              ? "Products"
              : label === "Clientes"
              ? "Clients"
              : label === "Usuarios"
              ? "Users"
              : label === "Nueva Factura"
              ? "New"
              : label === "Administrar Facturas"
              ? "Admin"
              : label === "Reporte Facturas"
              ? "Report"
              : label === "Configuracion"
              ? "System"
              : label === "Salir"
              ? "Out"
              : ""}
          </a>
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 text-center">MENU</div>
      <div className="py-2">
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">inventory_2</span>}
          label="Productos"
          active={true}
        />
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">group</span>}
          label="Clientes"
        />
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">person</span>}
          label="Usuarios"
        />
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">add_circle</span>}
          label="Nueva Factura"
        />
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">manage_accounts</span>}
          label="Administrar Facturas"
        />
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">bar_chart</span>}
          label="Reporte Facturas"
        />
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">settings</span>}
          label="Configuracion"
        />
        <SidebarItem
          icon={<span className="material-icons w-5 h-5">logout</span>}
          label="Salir"
        />
      </div>
    </div>
  );
}
