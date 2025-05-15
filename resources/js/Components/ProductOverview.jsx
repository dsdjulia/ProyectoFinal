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



const ProductOverview = ({ producto, productos = [], onSelectProducto = () => {} }) => {
if (!producto) {

    const productos = [ /* Productos de mentira */
  {
    id: 1,
    codigo: "CAM123",
    nombre: "Cámara Fotográfica Pro X10",
    descripcion: "Una cámara profesional con zoom óptico de 50x y grabación en 4K.",
    imagen: "https://www.pngarts.com/files/3/Photo-Camera-Free-PNG-Image.png"
  },
  {
    id: 2,
    codigo: "LAP456",
    nombre: "Laptop UltraSpeed 15”",
    descripcion: "Laptop con procesador i7, 16GB RAM y SSD de 512GB.",
    imagen: "https://www.pngmart.com/files/13/Laptop-PNG-Image.png"
  },
  {
    id: 3,
    codigo: "TEL789",
    nombre: "Smartphone Galaxy X",
    descripcion: "Teléfono inteligente con pantalla AMOLED y 128GB de almacenamiento.",
    imagen: "https://www.pngarts.com/files/7/Smartphone-Transparent-Images.png"
  },
  {
    id: 4,
    codigo: "TV101",
    nombre: "Televisor LED 4K Ultra HD",
    descripcion: "Pantalla de 55 pulgadas con HDR y conectividad inteligente.",
    imagen: "https://www.pngmart.com/files/16/4K-TV-PNG-Photos.png"
  },
  {
    id: 5,
    codigo: "AUD234",
    nombre: "Auriculares Inalámbricos SoundPro",
    descripcion: "Con cancelación de ruido y duración de batería de hasta 30 horas.",
    imagen: "https://www.pngmart.com/files/21/Wireless-Headphones-PNG-Clipart.png"
  }
];


  return (
    <div className="w-full bg-slate-100 p-6 h-[80vh]">
      <h2 className="text-xl font-bold text-slate-700 mb-2">Ningún Producto Seleccionado</h2>
      <p className="text-sm text-gray-600 mb-4">Primero selecciona un producto para su visualización</p>

      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full bg-white border border-slate-300 text-sm">
          <thead className="bg-slate-200 text-slate-700">
            <tr>
              <th className="px-4 py-2 text-left border-b">ID</th>
              <th className="px-4 py-2 text-left border-b">Nombre del Producto</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr
                key={prod.id}
                className="cursor-pointer hover:bg-slate-100 transition"
                onClick={() => onSelectProducto(prod)}
              >
                <td className="px-4 py-2 border-b">{prod.id}</td>
                <td className="px-4 py-2 border-b">{prod.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


  // Si hay producto seleccionado, mostrar vista detallada
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
    <div className="flex flex-col lg:flex-row gap-12 bg-slate-100 px-12 mb-20 ">
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
