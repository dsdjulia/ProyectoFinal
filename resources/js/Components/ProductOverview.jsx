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
  Filler
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

const ProductOverview = ({ producto }) => {
  const revenue = 12456;
  const netProfitEstimate = 8000;
  const stock = 240;
  const recommendedReorder = 100;
  const estimatedSold = 360;

  const revenueData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Ingresos mensuales ($)",
        data: [2800, 3300, 3100, 3256],
        backgroundColor: "#4ade80"
      }
    ]
  };

  const salesDistributionData = {
    labels: ["Vendido", "En Stock"],
    datasets: [
      {
        data: [estimatedSold, stock],
        backgroundColor: ["#60a5fa", "#facc15"]
      }
    ]
  };

  const stockTrendData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May"],
    datasets: [
      {
        label: "Nivel de Stock",
        data: [500, 400, 350, 280, stock],
        borderColor: "#f87171",
        backgroundColor: "#fecaca",
        fill: true
      }
    ]
  };

  return (
    <div className=" flex flex-col lg:flex-row gap-12 bg-slate-100 px-12 ">
      {/* Tarjeta del producto con imagen y detalles */}
      <div className="w-full lg:w-2/5 bg-transparent p-4 flex flex-col items-center justify-around pt-20">
        <div className="text-center">
          <h1 className="text-xl font-bold">{producto.nombre}</h1>
          <p className="text-gray-600 text-sm mt-1">{producto.descripcion}</p>
        </div>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full max-w-xs object-contain rounded-md mb-4"
        />
      </div>

      {/* Gráficos y estadísticas */}
      <div className="w-full lg:w-3/5 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Ingresos */}
          <div className="p-4 bg-white rounded-md shadow w-full md:w-1/2">
            <h2 className="text-sm font-bold mb-2">Ingresos Mensuales</h2>
            <div className="h-40">
              <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Distribución */}
          <div className="p-4 bg-white rounded-md shadow w-full md:w-1/2">
            <h2 className="text-sm font-bold mb-2">Distribución de Ventas</h2>
            <div className="h-40">
              <Doughnut data={salesDistributionData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Tendencia del stock */}
        <div className="p-4 bg-white rounded-md shadow">
          <h2 className="text-sm font-bold mb-2">Tendencia del Stock</h2>
          <div className="h-32">
            <Line data={stockTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white rounded-md shadow p-4 w-full md:w-1/3">
            <h2 className="text-sm font-bold">Beneficio Neto Estimado</h2>
            <p className="text-2xl font-semibold text-green-500 mt-1">${netProfitEstimate}</p>
          </div>
          <div className="bg-white rounded-md shadow p-4 w-full md:w-1/3">
            <h2 className="text-sm font-bold">Stock Disponible</h2>
            <p className="text-2xl font-semibold text-yellow-500 mt-1">{stock} unidades</p>
            <p className="text-xs text-gray-500 mt-1">
              Reorden sugerido: <span className="font-medium">{recommendedReorder} unidades</span>
            </p>
          </div>
          <div className="bg-white rounded-md shadow p-4 w-full md:w-1/3">
            <h2 className="text-sm font-bold">Ventas Estimadas Este Mes</h2>
            <p className="text-2xl font-semibold text-blue-500 mt-1">{estimatedSold} unidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
