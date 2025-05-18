import { showModificableAlert } from "@/utils/alerts";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function CantidadModal({
    isOpen,
    onClose,
    producto,
    tipo,
    clientes = [],
}) {
    const [cantidad, setCantidad] = useState("");
    const [clienteSeleccionado, setClienteSeleccionado] = useState("");
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre_cliente: "",
        identificacion_cliente: "",
        telefono_cliente: "",
        email_cliente: "",
        direccion_cliente: "",
    });

    const esVenta = tipo === "venta";

    if (!isOpen) return null;

    const titulo = esVenta
        ? "¿Cuántas unidades quieres vender?"
        : "¿Has recibido el pedido?";
    const botonTexto = esVenta ? "Registrar venta" : "Registrar recepción";
    const botonColor = esVenta
        ? "bg-green-600 hover:bg-green-700"
        : "bg-slate-400 hover:bg-slate-700";

    if (!esVenta && producto.estado) {
        showModificableAlert(
            "Pedido ya recibido",
            `El producto ${producto.nombre} ya ha sido marcado como recibido.`,
            "error"
        );
        onClose();
        return;
    }

    // const [formData, setFormData] = useState({
    //     codigo: "",
    //     nombre: "",
    //     precio_unitario: "",
    //     id_almacen: "",
    //     cantidad_vendida: "",
    //     nombre_cliente: "",
    //     identificacion_cliente: "",
    //     telefono_cliente: "",
    //     email_cliente: "",
    //     direccion_cliente: "",
    //     tipo_comprador: "",
    // });
// cantidad modal antiguo

    const handleSubmit = (e) => {
        e.preventDefault();

        const cantidadNum = parseInt(cantidad, 10);


        const datos = {
            ...producto,
            cantidad_vendida: cantidadNum,

        };

        if (esVenta) {
            if (clienteSeleccionado === "nuevo") {
                const camposRequeridos = Object.entries(nuevoCliente);
                for (const [campo, valor] of camposRequeridos) {
                    if (!valor.trim()) {
                        showModificableAlert(
                            "Falta información",
                            `El campo ${campo.replace(
                                "_",
                                " "
                            )} es obligatorio.`,
                            "error"
                        );
                        return;
                    }
                }
                Object.assign(datos, nuevoCliente);
            } else {
                datos.id_cliente = clienteSeleccionado;
            }

            router.post(route("ventas.store"), datos, {
                onSuccess: () => {
                    showModificableAlert(
                        "Producto vendido",
                        `El producto "${producto.nombre}" se ha marcado como vendido.`,
                        "success"
                    );
                    setCantidad("");
                    setClienteSeleccionado("");
                    setNuevoCliente({
                        nombre_cliente: "",
                        identificacion_cliente: "",
                        telefono_cliente: "",
                        email_cliente: "",
                        direccion_cliente: "",
                    });
                    onClose();
                    router.visit(route("ventas.index"), {
                        preserveScroll: true,
                    });
                },
                onError: (errors) => {
                    showModificableAlert(
                        "Error al vender el producto",
                        `Detalles: ${JSON.stringify(errors)}`,
                        "error"
                    );
                },
            });
        } else {
            router.post(route("pedidos.addInventario"), datos, {
                onSuccess: () => {
                    showModificableAlert(
                        "Pedido registrado",
                        "Se actualizó el inventario correctamente.",
                        "success"
                    );
                    setCantidad("");
                    onClose();
                    router.visit(route("pedidos.index"), {
                        preserveScroll: true,
                    });
                },
                onError: (errors) => {
                    showModificableAlert(
                        "Error al registrar",
                        `Detalles: ${JSON.stringify(errors)}`,
                        "error"
                    );
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {titulo}
                </h2>

                <div className="mb-2 text-gray-700">
                    Producto:{" "}
                    <span className="font-semibold">{producto?.nombre}</span>
                </div>
                <div className="mb-4 text-gray-700">
                    Cantidad en inventario:{" "}
                    <span className="font-semibold">
                        {producto?.cantidad_actual}
                    </span>
                </div>

                <form onSubmit={handleSubmit}>
                    {esVenta && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">
                                    Cantidad a vender
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={producto.cantidad_actual}
                                    value={cantidad}
                                    onChange={(e) =>
                                        setCantidad(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Máximo ${producto.cantidad_actual}`}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">
                                    Precio de venta por unidad
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={precio_venta}
                                    onChange={(e) =>
                                        setCantidad(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={`precio de venta unitario`}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-1">
                                    Seleccionar cliente
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    value={clienteSeleccionado}
                                    onChange={(e) =>
                                        setClienteSeleccionado(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Selecciona un cliente
                                    </option>
                                    {clientes.map((cliente) => (
                                        <option
                                            key={cliente.id}
                                            value={cliente.id}
                                        >
                                            {cliente.nombre}
                                        </option>
                                    ))}
                                    <option value="nuevo">
                                        + Crear nuevo cliente
                                    </option>
                                </select>
                            </div>

                            {clienteSeleccionado === "nuevo" && (
                                <div className="space-y-3 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre del cliente"
                                        value={nuevoCliente.nombre_cliente}
                                        onChange={(e) =>
                                            setNuevoCliente({
                                                ...nuevoCliente,
                                                nombre_cliente: e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                    />
                                    <select
                                        value={nuevoCliente.tipo_comprador}
                                        onChange={(e) =>
                                            setNuevoCliente({
                                                ...nuevoCliente,
                                                tipo_comprador: e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                    >
                                        <option value="">
                                            Selecciona tipo de cliente
                                        </option>
                                        <option value="particular">
                                            Particular
                                        </option>
                                        <option value="empresa">Empresa</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Identificación"
                                        value={
                                            nuevoCliente.identificacion_cliente
                                        }
                                        onChange={(e) =>
                                            setNuevoCliente({
                                                ...nuevoCliente,
                                                identificacion_cliente:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Teléfono"
                                        value={nuevoCliente.telefono_cliente}
                                        onChange={(e) =>
                                            setNuevoCliente({
                                                ...nuevoCliente,
                                                telefono_cliente:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={nuevoCliente.email_cliente}
                                        onChange={(e) =>
                                            setNuevoCliente({
                                                ...nuevoCliente,
                                                email_cliente: e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Dirección"
                                        value={nuevoCliente.direccion_cliente}
                                        onChange={(e) =>
                                            setNuevoCliente({
                                                ...nuevoCliente,
                                                direccion_cliente:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        required
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setCantidad("");
                                setClienteSeleccionado("");
                                onClose();
                            }}
                            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-md text-white ${botonColor} transition`}
                        >
                            {botonTexto}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
