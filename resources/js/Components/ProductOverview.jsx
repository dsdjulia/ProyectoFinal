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
  ArcElement
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
  ArcElement
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
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Detalle del Producto</h1>
        <p className="text-lg text-gray-600">{producto}</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Gráficos */}
        <div className="flex flex-col gap-6 w-full lg:w-3/5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Ingresos */}
            <div className="p-4 bg-white rounded-md shadow  w-full md:w-1/2">
              <h2 className="text-base font-bold mb-2">Ingresos Mensuales</h2>
              <div className="h-48">
                <Bar
                  data={revenueData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    layout: { padding: 10 }
                  }}
                />
              </div>
            </div>

            {/* Donut */}
            <div className="p-4 bg-white rounded-md shadow min-h-[200px] w-full md:w-1/2">
              <h2 className="text-base font-bold mb-2">Distribución de Ventas</h2>
              <div className="h-48">
                <Doughnut
                  data={salesDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "left" } },
                    layout: { padding: 10 }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Línea */}
          <div className="p-4 bg-white rounded-md shadow min-h-[200px]">
            <h2 className="text-base font-bold mb-2">Tendencia del Stock</h2>
            <div className="h-32">
              <Line
                data={stockTrendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: { padding: 10 }
                }}
              />
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="flex flex-col justify-start gap-8 w-full lg:w-2/5">
          <div>
            <h2 className="text-lg font-bold">Beneficio Neto Estimado</h2>
            <p className="text-3xl font-semibold text-green-500">${netProfitEstimate}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Stock Disponible</h2>
            <p className="text-3xl font-semibold text-yellow-500">{stock} unidades</p>
            <p className="text-sm text-gray-500 mt-1">
              Nivel recomendado de reabastecimiento:{" "}
              <span className="font-medium">{recommendedReorder} unidades</span>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Estimación de Ventas Este Mes</h2>
            <p className="text-3xl font-semibold text-blue-500">{estimatedSold} unidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
