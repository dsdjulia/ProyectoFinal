import { useState } from "react";

export default function ConcactoProveedores({ proveedores }) {
    const [selectedProveedor, setSelectedProveedor] = useState(proveedores[0] ?? null);
    const [mensaje, setMensaje] = useState("");

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-8">
            {/* Lista de proveedores */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 col-span-1">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Proveedores</h2>
                <ul className="divide-y divide-slate-100">
                    {proveedores.map((prov) => (
                        <li
                            key={prov.id}
                            onClick={() => setSelectedProveedor(prov)}
                            className={`p-2 cursor-pointer rounded-md text-sm ${
                                selectedProveedor?.id === prov.id
                                    ? "bg-slate-100 text-slate-800 font-medium"
                                    : "text-slate-600 hover:bg-slate-50"
                            }`}
                        >
                            {prov.nombre}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tabla de proveedores */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 col-span-2 overflow-auto">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Detalles</h2>
                <table className="min-w-full text-sm text-slate-600">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-3">Nombre</th>
                            <th className="text-left py-2 px-3">Teléfono</th>
                            <th className="text-left py-2 px-3">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.map((prov) => (
                            <tr key={prov.id} className="hover:bg-slate-50">
                                <td className="py-2 px-3">{prov.nombre}</td>
                                <td className="py-2 px-3">{prov.telefono}</td>
                                <td className="py-2 px-3">{prov.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mensaje al proveedor */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 col-span-1 flex flex-col">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Contacto</h2>
                {selectedProveedor ? (
                    <>
                        <p className="text-sm text-slate-500 mb-2">
                            Escribe un mensaje a <span className="font-medium text-slate-700">{selectedProveedor.nombre}</span>:
                        </p>
                        <textarea
                            rows={6}
                            className="w-full border border-slate-300 rounded-lg p-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            placeholder="Escribe tu mensaje..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        ></textarea>
                        <button
                            onClick={() => alert(`Mensaje enviado a ${selectedProveedor.email}`)}
                            className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm py-2 px-4 rounded-xl transition"
                        >
                            Enviar
                        </button>
                    </>
                ) : (
                    <p className="text-sm text-slate-500">Selecciona un proveedor para contactar.</p>
                )}
            </div>
        </div>
    );
}
