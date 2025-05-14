<?php

namespace App\Http\Controllers\Web;
use App\Http\Controllers\Controller;

use Inertia\Inertia;
use App\Models\Compra;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\Proveedor;
use App\Models\Inventario;
use App\Models\DetalleVenta;
use Illuminate\Http\Request;
use App\Models\DetalleCompra;
use Illuminate\Support\Facades\Auth;

class DetallesCompraController extends Controller
{
    //
    public function index(){
        $user = Auth::user();

        $almacenesQuery = Almacen::with(['productos' => function ($query) {
            $query->withPivot('id_almacen','cantidad_actual', 'precio_unitario', 'fecha_entrada', 'fecha_salida');
        }])
        ->where('id_user', $user->id);

        $allProductos = [];

        $almacenes = $almacenesQuery->get()->map(function ($almacen) use (&$allProductos) {
            $productos = $almacen->productos;

            $precioTotal = $productos->sum(fn($producto) =>
                $producto->pivot->cantidad_actual * $producto->pivot->precio_unitario
            );

            $cantidadTotal = $productos->sum(fn($producto) =>
                $producto->pivot->cantidad_actual
            );

            $productosData = $productos->map(function ($producto) use ($almacen) {
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
                ];
            })->toArray();

            // Acumular productos en la lista global
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

        $stats = $this->calcularStockStats($almacenes);

        $detallesComprasRaw = DetalleCompra::with(['producto', 'compra.proveedor'])
            ->whereHas('compra', function ($query) use ($user){
                $query->where('id_user', $user->id);
            })
            ->get();

        $all_proveedores = $detallesComprasRaw
            ->pluck('compra.proveedor')
            ->filter()
            ->unique('id')
            ->values();

        $detallesCompras = $detallesComprasRaw->map(function ($detalle) {
            return [
                'producto_id' => $detalle->id_producto,
                'codigo' => $detalle->producto->codigo,
                'nombre' => $detalle->producto->nombre,
                'precio_unitario' => $detalle->precio_unitario,
                'cantidad' => $detalle->cantidad,
                'estado' => $detalle->estado,
                'fecha_compra' => optional($detalle->compra)->fecha_compra,
                'proveedor' => optional($detalle->compra->proveedor)->nombre,
            ];
        });

        $detallesVentas = DetalleVenta::with(['producto', 'venta.comprador'])
            ->whereHas('venta', function ($query) use ($user){
                $query->where('id_user',$user->id);
            })
            ->get()
            ->map(function ($detalle) {
            return [
                'producto_id' => $detalle->id_producto,
                'codigo' => $detalle->producto->codigo,
                'nombre' => $detalle->producto->nombre,
                'precio_unitario' => $detalle->precio_unitario,
                'cantidad' => $detalle->cantidad,
                'fecha_venta' => optional($detalle->venta)->fecha_venta,
                'cliente' => optional($detalle->venta->comprador)->nombre,
            ];
        });

        $allAlmacenes = Almacen::with(['productos' => function ($query) {
            $query->withPivot('id_almacen','cantidad_actual', 'precio_unitario', 'fecha_entrada', 'fecha_salida');
        }])
        ->where('id_user', $user->id)->get();

        $categorias = Categoria::where('id_user', $user->id)->with('productos')->get();


        return Inertia::render('Pedidos', props: [
            'status' => true,
            'message' => 'Almacenes encontrados',
            'count' => $almacenes->count(),
            'total_productos' => $almacenes->sum('productos_count'),
            'total_unidades' => $almacenes->sum('cantidad_total'),
            'total_precio' => $almacenes->sum('precio_total'),
            'disponible' => $stats['disponible'],
            'lowStock' => $stats['lowStock'],
            'agotado' => $stats['agotado'],
            'data' => $almacenes,
            'all_productos' => $allProductos,
            'all_almacenes' => $allAlmacenes,
            'all_proveedores' =>$all_proveedores,
            'detalles_compras' => $detallesCompras,
            'detalles_ventas' => $detallesVentas,
            'categorias' => $categorias,

        ]);
    }

    public function store(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'codigo' => 'required|string',
            'precio_unitario' => 'required|numeric|min:0',
            'unidades' => 'required|integer|min:1',

            'id_proveedor' => 'nullable|exists:proveedor,id',
            'nombre_proveedor' => 'nullable|string',
            'telefono' => 'nullable|string',
            'email' => 'nullable|email',
        ]);

        $producto = Producto::where('codigo', $datos['codigo'])->first();
        $proveedor = Proveedor::firstOrCreate([
            'nombre' => $datos['nombre_proveedor'],
            'telefono' => $datos['telefono'],
            'email' => $datos['email'],
        ]);

        $almacen = Almacen::where('id_user', $user->id)->first();

        $compra = Compra::create([
            'id_user' => $user->id,
            'id_proveedor' => $proveedor->id,
            'fecha_compra' => now()
        ]);

        DetalleCompra::create([
            'id_producto' => $producto->id,
            'id_compra' => $compra->id,
            'cantidad' => $datos['unidades'],
            'precio_unitario' => $datos['precio_unitario'],
            'estado' => true
        ]);

        $inventario = Inventario::where('id_producto', $producto->id)
            ->where('precio_unitario', $datos['precio_unitario'])
            ->first();

        if ($inventario) {
            $inventario->cantidad_actual += $datos['unidades'];
            $inventario->fecha_entrada = now();
            $inventario->save();
        } else {
            Inventario::create([
                'id_producto' => $producto->id,
                'id_almacen' => $almacen->id,
                'precio_unitario' => $datos['precio_unitario'],
                'cantidad_actual' => $datos['unidades'],
                'fecha_entrada' => now(),
                'fecha_salida' => null
            ]);
        }

        return redirect()->route('inventario.index');
    }


        public function calcularStockStats($almacenes)
    {
        $stats = [
            'disponible' => 0,
            'lowStock' => 0,
            'agotado' => 0,
        ];

        if($almacenes){
            foreach ($almacenes as $almacen) {
                foreach ($almacen['productos'] as $producto) {
                    $cantidad = $producto['cantidad_actual'];

                    if ($cantidad === 0) {
                        $stats['agotado']++;
                    } elseif ($cantidad < 10) {
                        $stats['lowStock']++;
                    } else {
                        $stats['disponible']++;
                    }
                }
            }
        }

        return $stats;
    }
}
