export default function Chip({ status }) {
    const statusStyles = {
      pendiente: "bg-orange-100 border-orange-300 text-orange-600",
      cancelado: "bg-red-100 border-red-300 text-red-600",
      recibido: "bg-green-100 border-green-300 text-green-600",
    };

    const chipStyle = statusStyles[status] || "bg-gray-300 border-gray-600 text-gray-700";

    return (
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold border rounded-full ${chipStyle}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }
