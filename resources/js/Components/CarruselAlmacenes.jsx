"use client";

import { useState } from "react";

const almacenes = [
    {
        nombre: "Almacén Central",
        productos: 1320,
        valor: "$3,250,000",
        direccion: "Av. Principal 123, Bogotá",
    },
    {
        nombre: "Sucursal Norte",
        productos: 678,
        valor: "$1,470,000",
        direccion: "Cra. 45 #12-34, Medellín",
    },
    {
        nombre: "Depósito Cali",
        productos: 905,
        valor: "$2,110,000",
        direccion: "Calle 20 #7-30, Cali",
    },
    {
        nombre: "Depósito Cali",
        productos: 905,
        valor: "$2,110,000",
        direccion: "Calle 20 #7-30, Cali",
    },
    {
        nombre: "Almacén Central",
        productos: 1320,
        valor: "$3,250,000",
        direccion: "Av. Principal 123, Bogotá",
    },
    {
        nombre: "Sucursal Norte",
        productos: 678,
        valor: "$1,470,000",
        direccion: "Cra. 45 #12-34, Medellín",
    },
    {
        nombre: "Depósito Cali",
        productos: 905,
        valor: "$2,110,000",
        direccion: "Calle 20 #7-30, Cali",
    },
    {
        nombre: "Depósito Cali",
        productos: 905,
        valor: "$2,110,000",
        direccion: "Calle 20 #7-30, Cali",
    },
];

export default function CarruselAlmacenes() {
    const [selected, setSelected] = useState([]);

    const toggleSelect = (index) => {
        if (selected.includes(index)) {
            setSelected(selected.filter((i) => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    return (
        <div className="overflow-x-auto w-full py-4">
            <div className="flex space-x-4 px-1">
                {almacenes.map((almacen, index) => (
                    <div
                        key={index}
                        onClick={() => toggleSelect(index)}
                        className={`min-w-[250px] rounded-xl p-4 shadow-md flex-shrink-0 cursor-pointer
                            ${selected.includes(index)
                                ? "bg-slate-300 shadow-inner "
                                : "bg-slate-100 shadow-md"
                            }`}
                    >
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="material-icons text-slate-600 text-xl">
                                warehouse
                            </span>
                            <span className="font-bold text-slate-800">
                                {almacen.nombre}
                            </span>
                        </div>
                        <div className="text-xs font-bold text-slate-600">
                            <div>{almacen.productos} productos</div>
                            <div className="text-green-600">{almacen.valor}</div>
                            <div className="text-xs text-slate-500 mt-1">
                                {almacen.direccion}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
