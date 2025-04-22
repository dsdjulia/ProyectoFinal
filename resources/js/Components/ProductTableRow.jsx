import Chip from "@/Components/Chip";

export default function ProductTableRow({ product }) {
    return (
        <button
            className="grid grid-cols-9 items-center bg-white rounded-sm border border-slate-200 p-4 gap-4 hover:px-2 transition-all"
            onClick={() => console.log(`Selected: ${product.producto}`)}
        >
            {/* Imagen */}
            <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                        src={product.imagen}
                        alt={product.producto}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Código */}
            <div className="text-gray-700 font-semibold text-left pl-2">
                {product.codigo}
            </div>

            {/* Nombre del producto con tooltip */}
            <div className="relative group flex items-center col-span-2">
                <span className="text-gray-800 font-bold truncate w-full text-left">
                    {product.producto}
                </span>
                {/* Tooltip */}
                <div className="absolute top-6 left-6 max-w-xs bg-gray-700 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.producto}
                </div>
            </div>

            {/* Precio */}
            <div className="text-gray-700 text-center">{product.precio}</div>

            {/* Existencias */}
            <div className="text-gray-700 text-center">
                {product.existencias}
            </div>

            {/* Fecha */}
            <div className="text-gray-700 text-center">{product.fecha}</div>

            {/* Estado */}
            <div className="flex justify-center">
                <Chip status={product.status} />
            </div>

            {/* Acciones */}
            <div className="flex justify-center gap-8 items-center">
                <button
                    className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:text-slate-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Editing: ${product.producto}`);
                    }}
                >
                    <span className="material-icons">edit</span>
                </button>
                <button
                    className="flex items-center justify-center text-red-400 w-8 h-8 rounded-full hover:text-red-500"
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Deleting: ${product.producto}`);
                    }}
                >
                    <span className="material-icons ">delete</span>
                </button>
            </div>
        </button>
    );
}
