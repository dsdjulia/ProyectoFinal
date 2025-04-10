export default function ProductTableRow({ product }) {
    return (
      <tr className="bg-white rounded-md shadow-md">
        {/* Imagen del producto */}
        <td className="p-3">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ">
            <img
              src={product.imagen}
              alt={product.producto}
              className="object-cover w-full h-full"
            />
          </div>
        </td>
        {/* Código del producto */}
        <td className="p-3 text-[#333] text-center">{product.codigo}</td>
        {/* Nombre del producto */}
        <td className="p-3 text-[#333] text-center">{product.producto}</td>
        {/* Precio */}
        <td className="p-3 text-[#333] text-center">{product.precio}</td>
        {/* Existencias */}
        <td className="p-3 text-[#333] text-center">{product.existencias}</td>
        {/* Botón Editar */}
        <td className="p-3 text-center">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600 transition">
            Editar
          </button>
        </td>
        {/* Botón Eliminar */}
        <td className="p-3 text-center">
          <button className="bg-purple-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-500 transition">
            Eliminar
          </button>
        </td>
      </tr>
    );
  }
