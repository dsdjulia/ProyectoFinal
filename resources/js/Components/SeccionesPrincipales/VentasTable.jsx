import { useState, useEffect } from "react";
import { usePage , router } from "@inertiajs/inertia-react";



export default function VentasTable({ props }) {
    const [searchTerm, setSearchTerm] = useState("");
    const ventas = props.detalles_ventas;
    const [pagActual, setpagActual] = useState(1);
    const [cantPag, setcantPag] = useState(1); // Se ajusta dinámicamente
    const [productosFiltrados, setProductosFiltrados] = useState([]);

    useEffect(() => {
        const filteredVentas = ventas.filter((venta) =>
            venta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setProductosFiltrados(filteredVentas);
        setcantPag(Math.ceil(filteredVentas.length / 10)); // Calculamos la nueva cantidad de páginas
        setpagActual(1); // Vuelvo a la primera pagina cuando cambio el filtro
    }, [searchTerm, ventas, props.detalles_ventas]);

    // Paginamos el array de productos ya filtrados
    const arrayProductos = productosFiltrados.slice((pagActual - 1) * 10, pagActual * 10);

    const pageUp = () => {
        if (pagActual < cantPag) {
            setpagActual(pagActual + 1);
        }
    };

    const pageDown = () => {
        if (pagActual > 1) {
            setpagActual(pagActual - 1);
        }
    };

    const imprimirFactura = (id) => {
        console.log("ID recibido:", id);
        const url = route('factura.generar', { id });
        window.open(url, '_blank');
    };

    return (
        <div className="w-full flex flex-col align-middle justify-start p-12 pt-0npm r pb-34 h-full">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mt-4 p-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Ventas Realizadas
                </h2>

                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="border border-gray-300 rounded-lg py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-8 font-semibold text-gray-700 bg-slate-100 py-2 px-6 rounded-t-md">
                    <div className="text-start">ID Producto</div>
                    <div className="col-span-2 text-start">Nombre</div>
                    <div className="text-center">Precio Unitario</div>
                    <div className="text-center">Cantidad</div>
                    <div className="text-center">Fecha Venta</div>
                    <div className="text-center">Cliente</div>
                    <div className="text-center"></div>
                </div>

                {arrayProductos.length > 0 ? (
                    <div className="divide-y divide-gray-200 ">
                        {arrayProductos.map((venta) => (
                            <div
                                key={venta.id_detalle}
                                className="grid grid-cols-8 py-3 px-6 text-sm text-gray-700 hover:bg-gray-50 "
                            >
                                <div>{venta.producto_id}</div>
                                <div className="col-span-2">{venta.nombre}</div>
                                <div className="text-center">
                                    {venta.precio_unitario}
                                </div>
                                <div className="text-center">
                                    {venta.cantidad}
                                </div>
                                <div className="text-center">
                                    {venta.fecha_venta}
                                </div>
                                <div className="text-center">
                                    {venta.cliente || "N/A"}
                                </div>
                                <button
                                    onClick={() => imprimirFactura(venta.id_detalle)}
                                    className="text-center flex items-center justify-center w-full hover:text-slate-600"
                                    title="Imprimir factura"
                                >
                                    <span className="material-icons">print</span>
                                </button>
                            </div>
                        ))}

                        {/* paginacion */}
                        <div className="flex justify-center items-center mt-6 gap-4 pt-12">
                            <button
                                onClick={pageDown}
                                disabled={pagActual === 1}
                                className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                <span className="material-icons text-gray-700">
                                    chevron_left
                                </span>
                            </button>

                            <span className="text-sm text-gray-600">
                                Página {pagActual} de {cantPag}
                            </span>

                            <button
                                onClick={pageUp}
                                disabled={pagActual === cantPag || cantPag === 0}
                                className="px-4 py-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                <span className="material-icons text-gray-700">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                        No se encontraron ventas
                    </div>
                )}
            </div>
        </div>
    );
}
