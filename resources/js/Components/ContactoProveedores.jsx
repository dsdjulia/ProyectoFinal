import { useState } from "react";
import { router } from "@inertiajs/react";
import { showModificableAlert } from "@/utils/alerts";

export default function ConcactoProveedores({ proveedores }) {
    const [selectedProveedor, setSelectedProveedor] = useState(proveedores[0] ?? null);
    const [mensaje, setMensaje] = useState("");

    const enviarMail = () => {
        router.post(route('proveedor.email'), {
            to: selectedProveedor.email,
            subject: `Mensaje para ${selectedProveedor.nombre}`,
            message: mensaje,
        }, {
            onSuccess: () => {
                console.log('Entra aqui')
                showModificableAlert(
                    "Mail enviado",
                    `Mail enviado correctamente a: ${selectedProveedor.nombre}`,
                    "success"
                );
            },
            onError: (errors) => {
                showModificableAlert(
                    "Error al enviar el mail",
                    `Error: ${JSON.stringify(errors)}`,
                    "error"
                );
            },
        });
        setMensaje('')
}

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8 min-h-screen">
            {/* Columna izquierda (1/3): Proveedores + Detalles */}
            <div className="flex flex-col gap-4 col-span-2 h-full">
                {/* Lista de proveedores */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-4 flex-1 overflow-y-auto">
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

                {/* Tabla de detalles */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-md p-4 flex-1 overflow-y-auto">

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
            </div>

            {/* Área de contacto (2/3) sin tarjeta */}
            <div className=" flex flex-col justify-center h-full">
                 <span className="material-icons text-8xl text-slate-300 mb-4 self-center">badge</span>
                <h2 className="text-xl font-semibold text-slate-700 mb-4">Contacto</h2>
                {selectedProveedor ? (
                    <>
                        <p className="text-base text-slate-600 mb-2">
                            Escribe un mensaje a <span className="font-medium text-slate-800">{selectedProveedor.nombre}</span>:
                        </p>
                        <textarea
                            rows={12}
                            className="w-full border border-slate-300 rounded-lg p-4 text-base text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
                            placeholder="Escribe tu mensaje..."
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                        ></textarea>
                        <button
                            onClick={enviarMail}
                            disabled={!mensaje}
                            className="mt-4 bg-slate-600 hover:bg-slate-700 text-white text-sm py-2 px-6 rounded-md transition"
                        >
                            Enviar
                        </button>
                    </>
                ) : (
                    <p className="text-base text-slate-500">Selecciona un proveedor para contactar.</p>
                )}
            </div>
        </div>
    );
}
