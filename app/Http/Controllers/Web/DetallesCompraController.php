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
            'codigo' => 'required|string',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|string',

            //Inventario
            'precio_unitario' => 'required|numeric|min:0',
            'unidades' => 'required|integer|min:1',
            'id_almacen' => 'required|exists:almacenes,id',

            //Proveedor
            'id_proveedor' => 'nullable',
            'nombre_proveedor' => 'nullable|string',
            'telefono' => 'nullable|string',
            'email' => 'nullable|email',

            //datos para la categoria
            'id_categoria' => '',
            'nombre_categoria' => 'nullable|string',
            'perecedero' => 'nullable|boolean'
        ]);

        $producto = Producto::where('codigo', $datos['codigo'])->first();


        $proveedor = null;

        if ($request->filled('id_proveedor')) {
            $proveedor = Proveedor::find($request['id_proveedor']);
        } else {
            $proveedor = Proveedor::where('nombre', $request->input('nombre_proveedor'))
                ->where('email', $request->input('email'))
                ->where('telefono', $request->input('telefono'))
                ->first();
        }

        // Si no existe, lo crea
        if (!$proveedor) {
            $proveedor = Proveedor::create([
                'nombre' => $request->input('nombre_proveedor'),
                'email' => $request->input('email'),
                'telefono' => $request->input('telefono'),
            ]);
        }

        $almacen = Almacen::where('id_user', $user->id)->first();

        $compra = Compra::create([
            'id_user' => $user->id,
            'id_proveedor' => $proveedor->id,
            'fecha_compra' => now(),
        ]);

        DetalleCompra::create([
            'id_producto' => $producto->id,
            'id_compra' => $compra->id,
            'cantidad' => $datos['unidades'],
            'precio_unitario' => $datos['precio_unitario'],
            'estado' => true,
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
                'fecha_salida' => null,
            ]);
        }

        return $this->renderInventario($user);
    }

    public function calcularStockStats($almacenes)
    {
        $stats = [
            'disponible' => 0,
            'lowStock' => 0,
            'agotado' => 0,
        ];

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

        return $stats;
    }

    private function renderInventario($user, $almacenesIds = null){
        // Cargar los detalles de compras con sus relaciones
        $detallesComprasRaw = DetalleCompra::with(['producto', 'compra.proveedor'])
            ->whereHas('compra', function ($query) use ($user) {
                $query->where('id_user', $user->id);
            })
            ->get();

        // Agrupar proveedores por producto_id
        $proveedoresPorProducto = [];
        foreach ($detallesComprasRaw as $detalle) {
            $productoId = $detalle->id_producto;
            $proveedor = optional($detalle->compra->proveedor);

            if ($proveedor && $proveedor->id) {
                $proveedoresPorProducto[$productoId][$proveedor->id] = [
                    'id' => $proveedor->id,
                    'nombre' => $proveedor->nombre,
                    'telefono' => $proveedor->telefono,
                    'email' => $proveedor->email,
                ];
            }
        }

        $almacenesQuery = Almacen::with(['productos' => function ($query) {
            $query->withPivot('id_almacen', 'cantidad_actual', 'precio_unitario', 'fecha_entrada', 'fecha_salida');
        }])
        ->where('id_user', $user->id);

        $allProductos = [];

        $almacenes = $almacenesQuery->get()->map(function ($almacen) use (&$allProductos, $proveedoresPorProducto) {
            $productos = $almacen->productos;

            $precioTotal = $productos->sum(fn($producto) =>
                $producto->pivot->cantidad_actual * $producto->pivot->precio_unitario
            );

            $cantidadTotal = $productos->sum(fn($producto) =>
                $producto->pivot->cantidad_actual
            );

            $productosData = $productos->map(function ($producto) use ($almacen, $proveedoresPorProducto) {
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
                    'proveedores' => array_values($proveedoresPorProducto[$producto->id] ?? []),
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

        $stats = $this->calcularStockStats($almacenes);

        $all_proveedores = $detallesComprasRaw
            ->pluck('compra.proveedor')
            ->filter()
            ->unique('id')
            ->values();

        $detallesCompras = $detallesComprasRaw->map(function ($detalle) {
            return [
                'cantidad' => $detalle->cantidad,
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
                    'cantidad' => $detalle->cantidad,
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
            // 'count' => $almacenes->count(),
            // 'total_productos' => $almacenes->sum('productos_count'),
            // 'total_unidades' => $almacenes->sum('cantidad_total'),
            // 'total_precio' => $almacenes->sum('precio_total'),
            // 'disponible' => $stats['disponible'],
            // 'lowStock' => $stats['lowStock'],
            // 'agotado' => $stats['agotado'],
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
