export default function ProductRegistrationForm() {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-xl mb-4">Registrar Productos</h2>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1">Codigo</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm mb-1">Descripcion</label>
          <input type="text" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Precio</label>
          <input type="text" className="w-full border p-2 rounded" defaultValue="0" />
        </div>
        <div>
          <label className="block text-sm mb-1">Existencias</label>
          <input type="text" className="w-full border p-2 rounded" defaultValue="1" />
        </div>
        <div>
          <label className="block text-sm mb-1">P. Iva</label>
          <input type="text" className="w-full border p-2 rounded" defaultValue="0" />
        </div>
        <div className="col-span-5 text-right">
          <button className="bg-[#3498db] text-white px-4 py-2 rounded">Guardar</button>
        </div>
      </div>
    </div>
  )
}
