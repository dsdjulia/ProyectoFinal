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

export default function Main({props})
{

       const ventasData = {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        datasets: [
            {
                label: "Ventas ($)",
                data: [2200, 1800, 2500, 2100, 2600, 3000, 2800],
                backgroundColor: "#0ea5e9", // blue-500
                borderRadius: 6,
            },
        ],
    };

    const gastosData = {
        labels: ["Ene", "Feb", "Mar", "Abr", "May"],
        datasets: [
            {
                label: "Gastos ($)",
                data: [10000, 11000, 9500, 12300, 11700],
                borderColor: "#14b8a6", // teal-500
                backgroundColor: "rgba(20, 184, 166, 0.1)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const distribucionVentas = {
        labels: ["Cámaras", "Laptops", "Celulares", "TVs"],
        datasets: [
            {
                data: [25, 35, 20, 20],
                backgroundColor: ["#64748b", "#0ea5e9", "#22d3ee", "#10b981"],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#334155", // slate-700
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
                                    { label: "Almacenes", value: 12, growth: "+2" },
                                    { label: "Total Productos", value: "2,345", growth: "+180" },
                                    { label: "Total Ventas", value: "$45,231.89", growth: "+20.1%" },
                                    { label: "Beneficio Mensual", value: "$23,775.49", growth: "+8.2%" },
                                ].map((item, index) => (
                                    <div key={index} className="bg-transparent p-5 border-r-2 border-slate-300">
                                        <div className="text-sm text-slate-500 mb-1">{item.label}</div>
                                        <div className="text-xl font-semibold text-slate-800">{item.value}</div>
                                        <div className="text-xs text-green-500 mt-1">{item.growth} este mes</div>
                                    </div>
                                ))}
                            </div>



                    <hr />

                    {/* Cuerpo principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                        {/* Producto estrella */}
                        <div className="col-span-1 flex flex-col gap-4 h-full bg-transparent p-5 ">
                            <h2 className="text-lg font-semibold text-slate-700 mb-2">Producto Estrella</h2>
                            <div className="flex flex-col gap-3 text-slate-700 h-full">
                                <img
                                    src="https://assets2.jabra.com/5/4/6/5/546568a4bd3266aec0161e6a4ec0d4e906c267a2_evolve2_buds_uc_usba_01.png?w=585&h=585&auto=format,compress"
                                    alt="Producto Estrella"
                                    className="w-full object-contain rounded-xl"
                                />
                                <h3 className="text-xl font-bold">Auriculares Pro X</h3>
                                <p className="text-sm text-slate-500">
                                    Auriculares con cancelación activa de ruido, diseño premium y excelente rendimiento de ventas.
                                </p>
                                <p className="text-emerald-500 text-sm font-medium mt-auto">
                                    Beneficio mensual: $6,329.00
                                </p>
                            </div>
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
