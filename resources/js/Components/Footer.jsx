import logoMedac from "../../images/logoMedac.png";

export default function Footer() {
  return (
    <footer className="bg-white  py-4 px-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">

      {/* Sección izquierda */}
      <div className="text-center sm:text-left">
        <p className="font-medium">Todos los derechos reservados</p>
        <p className="text-xs">Proyecto Final DAW - Versión 1.0</p>
      </div>

      {/* Logo al centro con recorte de espacio vacío */}
      <div className="h-12 w-28 overflow-hidden flex justify-center items-center">
        <img
          src={logoMedac}
          alt="Logo Medac"
          className="h-22 object-cover"
        />
      </div>

      {/* Sección derecha */}
      <div className="text-center sm:text-right">
        <p>Sistema de Facturación e Inventario Web</p>
      </div>
    </footer>
  );
}
