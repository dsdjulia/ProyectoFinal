import Chip from '@/Components/Chip'

export default function ProductTableRow({ product }) {
    return (
      <tr className="bg-white rounded-md border-b border-slate-200 text-sm">
        {/* Imagen del producto */}
        <td className="p-3 flex  justify-center align-middle">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={product.imagen}
              alt={product.producto}
              className="object-cover w-full h-full bg-red-200"
            />
          </div>
        </td>
        {/* Código del producto */}
        <td className="p-3 pl-6 text-[#333] text-start font-extrabold ">{product.codigo}</td>
        {/* Nombre del producto */}
        <td className="p-3  text-[#333] text-start font-extrabold pr-24">{product.producto}</td>
        {/* Precio */}
        <td className="p-3 text-[#333] text-center ">{product.precio}</td>
        {/* Existencias */}
        <td className="p-3 text-[#333] text-center">{product.existencias}</td>
        {/* Fecha */}
        <td className="p-3 text-[#333] text-center">{product.fecha}</td>
        {/* Estado */}
        <td className="p-3 text-[#333] text-center"><Chip status={product.status}/></td>
        {/* Botones */}
        <td className="p-3 text-center flex justify-around items-center align-center">
        <button className="flex items-center align-middle justify-center text-slate-400 text-center hover:text-slate-500">
          <span className="material-icons">edit</span>
        </button>
        <button className="flex items-center align-middle justify-center text-slate-300 text-center hover:text-red-400">
          <span className="material-icons flex items-center text-center justify-center">delete</span>
        </button>
        </td>
      </tr>
    );
  }
