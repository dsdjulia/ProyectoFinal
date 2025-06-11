"use client";

import React from "react";
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
import { router } from "@inertiajs/react";

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

const ProductOverview = ({ producto, productos = [], searchTerm, props }) => {
    console.log(producto);

    console.log(productos);

    console.log(props);

    const detalleProducto = (prod) => {
        console.log(prod);
        router.get(route("producto.index", { id: prod.id_producto }), {
            onSuccess: () => {},
            onError: (errors) => {
                showModificableAlert(
                    "Error al mostar los detalles del producto",
                    `Error: ${JSON.stringify(errors)}`,
                    "error"
                );
            },
        });
    };

    if (!producto) {
        return (
            <div className="w-full bg-slate-100 p-6 min-h-[80vh] flex flex-col items-center text-center">
                <h2 className="text-xl font-bold text-slate-700 mb-2">
                    Ningún Producto Seleccionado
                </h2>
                <p className="text-sm text-gray-600 mb-4 max-w-xs">
                    Primero selecciona un producto para su visualización
                </p>

                <div className="overflow-x-auto w-full rounded-md shadow mt-4">
                    <table className="min-w-full bg-white border border-slate-300 text-sm">
                        <thead className="bg-slate-200 text-slate-700">
                            <tr>
                                <th className="px-4 py-2 text-left border-b">
                                    ID
                                </th>
                                <th className="px-4 py-2 text-left border-b">
                                    Nombre del Producto
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos
                                .filter((prod) =>
                                    prod.nombre
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((prod) => (
                                    <tr
                                        key={prod.id_producto}
                                        className="cursor-pointer hover:bg-slate-100 transition"
                                        onClick={() => detalleProducto(prod)}
                                    >
                                        <td className="px-4 py-2 border-b">
                                            {prod.id_producto}
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            {prod.nombre}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // Variables para datos del producto
    const {
        beneficio_estimado: netProfitEstimate,
        stock,
        ventas_estimadas_mes: estimatedSold,
        total_vendido: ventastotales,
        ventas_por_semana: ventasSemanas,
        stock_tendencia_chart: stockTendencia,
    } = props;

    const datosBarras = ventasSemanas.map((venta) => venta.total);

    const revenueData = {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        datasets: [
            {
                label: "Ingresos mensuales (€)",
                data: datosBarras,
                backgroundColor: "#2c4360",
            },
        ],
    };

    const salesDistributionData = {
        labels: ["Vendido", "En Stock"],
        datasets: [
            {
                data: [ventastotales, stock],
                backgroundColor: ["#2c4360", "#a3bbd6"],
            },
        ],
    };

    const stockTrendData = {
        labels: stockTendencia.labels,
        datasets: [
            {
                label: "Nivel de Stock",
                data: stockTendencia.data,
                borderColor: "#324d72",
                backgroundColor: "#cedae9",
                fill: true,
            },
        ],
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full mt-4 mb-4 border border-slate-200 rounded-lg p-3 sm:p-4 ">
            {/* Tarjeta del producto con imagen y detalles */}
            <div className="w-full lg:w-2/3 p-2 sm:p-4 flex flex-col items-center bg-slate-50 rounded-lg">
                <div className="text-center w-full">
                    <h1 className="text-lg sm:text-xl font-bold">
                        {producto.nombre}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        {producto.descripcion}
                    </p>
                </div>

                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain rounded-md my-4 shadow-sm"
                />
            </div>

            {/* Gráficos y estadísticas */}
            <div className="w-full lg:w-3/5 flex flex-col gap-4 text-xs sm:text-sm">
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Ingresos */}
                    <div className="p-2 sm:p-3 bg-white rounded-md shadow w-full md:w-1/2">
                        <h2 className="text-xs font-bold mb-1 sm:mb-2">
                            Ingresos Mensuales
                        </h2>
                        <div className="h-32 sm:h-40">
                            <Bar
                                data={revenueData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>

                    {/* Distribución */}
                    <div className="p-2 sm:p-3 bg-white rounded-md shadow w-full md:w-1/2">
                        <h2 className="text-xs font-bold mb-1 sm:mb-2">
                            Distribución de Ventas
                        </h2>
                        <div className="h-32 sm:h-40">
                            <Doughnut
                                data={salesDistributionData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Tendencia del stock */}
                <div className="p-2 sm:p-3 bg-white rounded-md shadow">
                    <h2 className="text-xs font-bold mb-1 sm:mb-2">
                        Tendencia del Stock
                    </h2>
                    <div className="h-28 sm:h-32">
                        <Line
                            data={stockTrendData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Beneficio Neto Estimado: Más énfasis en móvil */}
                    <div className="bg-white rounded-md shadow p-2 sm:p-3 w-full md:w-1/3 opacity-100">
                        <h2 className="text-xs font-bold">
                            Beneficio Neto Estimado
                        </h2>
                        <p className="text-xl sm:text-2xl font-semibold text-emerald-500 mt-1">
                            {netProfitEstimate} €
                        </p>
                    </div>

                    {/* Stock Disponible: énfasis medio */}
                    <div className="bg-white rounded-md shadow p-2 sm:p-3 w-full md:w-1/3 opacity-90">
                        <h2 className="text-xs font-bold">Stock Disponible</h2>
                        <p className="text-lg sm:text-xl font-semibold text-yellow-600 mt-1">
                            {stock} unidades
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                            Reorden sugerido:{" "}
                            <span className="font-medium">10 unidades</span>
                        </p>
                    </div>

                    {/* Ventas Estimadas: menor énfasis en móvil */}
                    <div className="bg-white rounded-md shadow p-2 sm:p-3 w-full md:w-1/3 opacity-80">
                        <h2 className="text-xs font-bold">
                            Ventas Estimadas Este Mes
                        </h2>
                        <p className="text-base sm:text-lg font-medium text-cyan-600 mt-1">
                            {estimatedSold} unidades
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;
