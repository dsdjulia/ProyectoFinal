export default function Chip({ status }) {
    const statusStyles = {
      false: "bg-orange-100 border-orange-300 text-orange-600",
      true: "bg-green-100 border-green-300 text-green-600",
    };

    const chipStyle = statusStyles[status] || "bg-gray-300 border-gray-600 text-gray-700";

    return (
      <span
        className={`inline-block px-3 py-1 text-sm font-semibold border rounded-full ${chipStyle}`}
      >
        {(status.charAt(0) === "t")?"Recibido":"Pendiente"}
      </span>
    );
  }
