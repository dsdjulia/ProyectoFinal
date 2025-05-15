<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Compra;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\Proveedor;
use App\Models\Inventario;
use App\Models\DetalleVenta;
use App\Models\DetalleCompra;

class DetallesCompraController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return $this->renderInventario($user);

    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $datos = $request->validate([
            //producto que pides
            'id_categoria' => 'nullable|integer',
            'codigo' => 'required|string',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'perecedero' => 'nullable|boolean',
            'imagen' => 'nullable|string',

            //Inventario
            'precio_unitario' => 'required|numeric|min:0',
            'cantidad_actual' => 'required|integer|min:1',
            'id_almacen' => 'required|exists:almacenes,id',

            //Proveedor
            'id_proveedor' => 'nullable',
            'nombre_proveedor' => 'nullable|string',
            'telefono' => 'nullable|string',
            'email' => 'nullable|email',

            //datos para crear la categoria
            'nombre_categoria' => 'nullable|string',
        ]);

        $categoria = Categoria::where('id_user', $user->id)
            ->where(function ($query) use ($datos) {
                $query->where('nombre', $datos['nombre_categoria'])
                    ->orWhere('id', $datos['id_categoria']);
            })
            ->first();

        if(!$categoria){
            $categoria = Categoria::create([
                'id_user'=>$user->id,
                'nombre'=>$datos['nombre_categoria'],
            ]);
        }

        $producto = Producto::where('codigo',$datos['codigo'])
            ->where('id_categoria',$categoria['id'])
            ->where('nombre',$datos['nombre'])
            ->where('descripcion',$datos['descripcion'])
            ->where('imagen',$datos['imagen'])
            ->where('perecedero',$datos['perecedero'])
            ->first();
            

        if(!$producto){
            $producto = Producto::create([
                'id_categoria' => $categoria['id'],
                'codigo' => $datos['codigo'],
                'nombre' =>  $datos['nombre'],
                'descripcion' =>  $datos['descripcion'],
                'perecedero' =>$datos['perecedero'],
                'imagen' =>  $datos['imagen']
            ]);
        }

        $proveedor = null;
        if ($request->filled('id_proveedor')) {
            $proveedor = Proveedor::find($request['id_proveedor']);
        }
        if (!$proveedor) {
            $proveedor = Proveedor::create([
                'nombre' => $request->input('nombre_proveedor'),
                'email' => $request->input('email'),
                'telefono' => $request->input('telefono'),
            ]);
        }

        $almacen = Almacen::where('id_user', $user->id)
        ->where('id',$datos['id_almacen'])
        ->first();

        $compra = Compra::create([
            'id_user' => $user->id,
            'id_proveedor' => $proveedor->id,
            'fecha_compra' => now(),
        ]);

        DetalleCompra::create([
            'id_producto' => $producto->id,
            'id_compra' => $compra->id,
            'cantidad_actual' => $datos['cantidad_actual'],
            'precio_unitario' => $datos['precio_unitario'],
            'estado' => false,
        ]);

        return $this->renderInventario($user);
    }

    public function addInventario(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            
        ]);

        $inventario = Inventario::where('id_producto', $datos['precio_unitario'])
            ->where('precio_unitario', $datos['precio_unitario'])
            ->first();

        if ($inventario) {
            $inventario->cantidad_actual += $datos['cantidad_actual'];
            $inventario->fecha_entrada = now();
            $inventario->save();
        }

        $inventario = Inventario::create([
            'id_producto',
            'id_almacen',
            'precio_unitario',
            'cantidad_actual',
            'fecha_entrada',
            'fecha_salida',
            'fecha_vencimiento',
        ]);

        return $this->renderInventario($user);


    }


    private function renderInventario($user, $almacenesIds = null){
        // Cargar los detalles de compras con sus relaciones para la lista general de proveedores
        $detallesComprasRaw = DetalleCompra::with(['producto', 'compra.proveedor'])
            ->whereHas('compra', function ($query) use ($user) {
                $query->where('id_user', $user->id);
            })
            ->get();

        $almacenesQuery = Almacen::with(['productos' => function ($query) {
            $query->withPivot('id_almacen', 'cantidad_actual', 'precio_unitario', 'fecha_entrada', 'fecha_salida');
        }])
        ->where('id_user', $user->id);

        $allProductos = [];

        $almacenes = $almacenesQuery->get()->map(function ($almacen) use (&$allProductos, $user) {
            $productos = $almacen->productos;

            $precioTotal = $productos->sum(fn($producto) =>
                $producto->pivot->cantidad_actual * $producto->pivot->precio_unitario
            );

            $cantidadTotal = $productos->sum(fn($producto) =>
                $producto->pivot->cantidad_actual
            );

            $productosData = $productos->map(function ($producto) use ($almacen, $user) {
                // Aquí usamos el método para obtener proveedores por producto
                $proveedores = $producto->proveedores($user->id)->map(function ($p) {
                    return [
                        'id' => $p->id,
                        'nombre' => $p->nombre,
                        'telefono' => $p->telefono,
                        'email' => $p->email,
                    ];
                })->values();

                return [
                    'id' => $producto->id,
                    'codigo' => $producto->codigo,
                    'nombre' => $producto->nombre,
                    'precio_unitario' => $producto->pivot->precio_unitario,
                    'cantidad_actual' => $producto->pivot->cantidad_actual,
                    'fecha_entrada' => $producto->pivot->fecha_entrada,
                    'fecha_salida' => $producto->pivot->fecha_salida,
                    'imagen' => $producto->imagen,
                    'almacen_id' => $almacen->id,
                    'almacen_nombre' => $almacen->nombre,
                    'proveedores' => $proveedores->toArray(),
                ];
            })->toArray();

            $allProductos = array_merge($allProductos, $productosData);

            return [
                'id' => $almacen->id,
                'nombre' => $almacen->nombre,
                'direccion' => $almacen->direccion,
                'productos_count' => $productos->count(),
                'cantidad_total' => $cantidadTotal,
                'precio_total' => $precioTotal,
                'productos' => $productosData,
            ];
        });

        // Lista general de proveedores únicos (sin repetir)
        $all_proveedores = $detallesComprasRaw
            ->pluck('compra.proveedor')
            ->filter()
            ->unique('id')
            ->values();

        // Mapear detalles de compras y ventas (igual que antes)
        $detallesCompras = $detallesComprasRaw->map(function ($detalle) {
            return [
                'cantidad_actual' => $detalle->cantidad_actual,
                'codigo' => $detalle->producto->codigo,
                'estado' => $detalle->estado,
                'fecha_compra' => optional($detalle->compra)->fecha_compra,
                'nombre' => $detalle->producto->nombre,
                'producto_id' => $detalle->id_producto,
                'precio_unitario' => $detalle->precio_unitario,
                'proveedor' => optional($detalle->compra->proveedor)->nombre,
            ];
        });

        $detallesVentas = DetalleVenta::with(['producto', 'venta.comprador'])
            ->whereHas('venta', function ($query) use ($user) {
                $query->where('id_user', $user->id);
            })
            ->get()
            ->map(function ($detalle) {
                return [
                    'producto_id' => $detalle->id_producto,
                    'codigo' => $detalle->producto->codigo,
                    'nombre' => $detalle->producto->nombre,
                    'precio_unitario' => $detalle->precio_unitario,
                    'cantidad_actual' => $detalle->cantidad_actual,
                    'fecha_venta' => optional($detalle->venta)->fecha_venta,
                    'cliente' => optional($detalle->venta->comprador)->nombre,
                ];
            });

        $allAlmacenes = Almacen::with(['productos' => function ($query) {
            $query->withPivot('id_almacen', 'cantidad_actual', 'precio_unitario', 'fecha_entrada', 'fecha_salida');
        }])
        ->where('id_user', $user->id)
        ->get();

        $categorias = Categoria::where('id_user', $user->id)
            ->with('productos')
            ->get();

        return Inertia::render('Pedidos', [
            'status' => true,
            'message' => 'Almacenes encontrados',
            'data' => $almacenes,
            'all_productos' => $allProductos,
            'all_almacenes' => $allAlmacenes,
            'all_proveedores' => $all_proveedores,
            'detalles_compras' => $detallesCompras,
            'detalles_ventas' => $detallesVentas,
            'categorias' => $categorias,
        ]);
    }
}
