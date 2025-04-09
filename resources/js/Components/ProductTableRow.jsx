export default function ProductTableRow({ product }) {
  return (
    <tr className="border-t">
      <td className="p-3">{product.codigo}</td>
      <td className="p-3">{product.producto}</td>
      <td className="p-3">{product.precio}</td>
      <td className="p-3">{product.existencias}</td>
      <td className="p-3">
        <button className="bg-[#3498db] text-white p-2 rounded flex items-center justify-center">
          <span className="material-icons w-4 h-4">edit</span>
        </button>
      </td>
      <td className="p-3">
        <button className="bg-red-500 text-white p-2 rounded flex items-center justify-center">
          <span className="material-icons w-4 h-4">delete</span>
        </button>
      </td>
    </tr>
  );
}
