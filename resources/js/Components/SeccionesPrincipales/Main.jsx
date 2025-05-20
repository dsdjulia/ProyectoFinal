// resources/js/Pages/Dashboard/Index.jsx
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

export default function Main({ props }) {
    // Desestructuramos los datos importantes para evitar repetir "datos."
    const [datos, setDatos] = useState(props);

    console.log(props)
    // Destructuramos producto estrella para usarlo directamente
    const producto_estrella = datos.producto_estrella || {};


    const ventasDiarias = props.ventas_dias

    const ventDiaLabel = [];
    const ventDiaData = [];

    ventasDiarias.forEach(venta => {
        ventDiaLabel.push(venta['dia'])
        ventDiaData.push(venta['total'])
    });

    const ventasData = {
        labels: ventDiaLabel,
        datasets: [
            {
                label: "Ventas ($)",
                data: ventDiaData,
                backgroundColor: "#7196bf", // blue-500
                borderRadius: 6,
            },
        ],
    };


    const gastos = props.gastos_mensuales
    const labelGastos = []
    const dataGastos = []
    gastos.forEach(gasto => {
        labelGastos.push(gasto.mes)
        dataGastos.push(gasto.total_gastos)
    });

    const gastosData = {
        labels: labelGastos,
        datasets: [
            {
                label: "Gastos ($)",
                data: dataGastos,
                borderColor: "#324d72", // teal-500
                backgroundColor: "#cedae9",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const distVent = props.distribucion_ventas
    const labelDisVent = []
    const dataDisVent = []
    distVent.forEach(dist => {
        labelDisVent.push(dist.categoria)
        dataDisVent.push(dist.total_vendido)
    });

    const distribucionVentas = {
        labels: labelDisVent,
        datasets: [
            {
                data: dataDisVent,
                backgroundColor: [
                    "#cedae9", // azul
                    "#7196bf", // verde
                    "#4f78a8", // naranja
                    "#1e293b", // gris/morado
                    "#1e293b"  // amarillo opcional
                    ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#1E293B", // slate-700
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#334155" },
                grid: { display: false },
            },
            y: {
                ticks: { color: "#334155" },
                grid: { color: "#e2e8f0" },
            },
        },
    };

    return (
        <div className="flex flex-col w-full px-8 py-6 gap-8 min-h-screen h-full">
            {/* Tarjetas de métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Almacenes", value: datos.total_almacenes, growth: datos.growth_almacenes },
                    { label: "Total Productos", value: datos.total_productos, growth: datos.growth_productos },
                    { label: "Total Ventas", value: datos.total_ventas, growth: datos.growth_ventas },
                    { label: "Beneficio Mensual", value: datos.beneficio_mensual, growth: datos.growth_beneficio },
                ].map((item, index) => (
                    <div key={index} className="bg-transparent p-5 border-r-2 border-slate-300">
                        <div className="text-sm text-slate-500 mb-1">{item.label}</div>
                        <div className="text-xl font-semibold text-slate-800">{item.value}</div>
                        <div
                            className={`text-xs mt-1 ${
                                item.growth.startsWith("+")
                                    ? "text-green-500"
                                    : item.growth.startsWith("-")
                                    ? "text-red-500"
                                    : "text-gray-500"
                            }`}
                        >
                            {item.growth} este mes
                        </div>
                    </div>
                ))}
            </div>

            <hr />

            {/* Cuerpo principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                {/* Producto estrella */}
                <div className="col-span-1 flex flex-col gap-4 h-full bg-transparent p-5 ">
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">Producto Estrella</h2>
                    {producto_estrella && producto_estrella.nombre ? (
                        <div className="flex flex-col gap-3 text-slate-700 h-full">
                            <img
                                src={producto_estrella.imagen || "https://via.placeholder.com/585x585?text=Sin+imagen"}
                                alt={producto_estrella.nombre}
                                className="w-full object-contain rounded-xl"
                            />
                            <h3 className="text-xl font-bold">{producto_estrella.nombre}</h3>
                            <p className="text-sm text-slate-500">
                                {producto_estrella.descripcion || "Producto más vendido del mes."}
                            </p>
                            <p className="text-emerald-500 text-sm font-medium mt-auto">
                                Total vendido: {producto_estrella.total_vendido ?? 0} unidades
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-slate-400 italic h-full">
                            No hay producto estrella disponible para este mes.
                        </div>
                    )}
                </div>

                {/* Gráficas */}
                <div className="lg:col-span-2 flex flex-col justify-between h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                            <h2 className="text-sm font-semibold text-slate-700 mb-2">Ventas Última Semana</h2>
                            <div className="flex-grow">
                                <Bar data={ventasData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                            <h2 className="text-sm font-semibold text-slate-700 mb-2">Gastos Mensuales</h2>
                            <div className="flex-grow">
                                <Line data={gastosData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col col-span-1 md:col-span-2">
                            <h2 className="text-sm font-semibold text-slate-700 mb-2">Distribución de Ventas</h2>
                            <div className="flex-grow">
                                <Doughnut data={distribucionVentas} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
