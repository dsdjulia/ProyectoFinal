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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-md shadow">
            <h2 className="text-lg font-bold mb-2">Ingresos Mensuales</h2>
            <Bar data={revenueData} options={{ responsive: true, plugins: { legend: { display: false }}}} />
          </div>

          <div className="p-4 bg-white rounded-md shadow">
            <h2 className="text-lg font-bold mb-2">Distribución de Ventas</h2>
            <Doughnut data={salesDistributionData} />
          </div>

          <div className="p-4 bg-white rounded-md shadow">
            <h2 className="text-lg font-bold mb-2">Tendencia del Stock</h2>
            <Line data={stockTrendData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div>
            <h2 className="text-lg font-bold">Beneficio Neto Estimado</h2>
            <p className="text-3xl font-semibold text-green-500">${netProfitEstimate}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Stock Disponible</h2>
            <p className="text-3xl font-semibold text-yellow-500">{stock} unidades</p>
            <p className="text-sm text-gray-500 mt-1">
              Nivel recomendado de reabastecimiento: <span className="font-medium">{recommendedReorder} unidades</span>
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
