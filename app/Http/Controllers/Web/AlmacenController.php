<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Almacen;
use App\Models\Inventario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AlmacenController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return $this->renderInventario($user);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
    
        $data = $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'required|string|max:255'
        ]);
    
        // Validación personalizada (si tienes una función específica)
        $validacion = $this->validatorAlmacen($data);
        if ($validacion->fails()) {
            return back()->withErrors($validacion)->withInput();
        }

        dd($user);
    
        // Crear el registro
        Almacen::create([
            'id_user' => $user->id,
            'nombre' => $data['nombre'],
            'direccion' => $data['direccion'],
        ]);
    
        // Redirigir a la página de inventario con un mensaje de éxito
        return $this->renderInventario($user);

    }
    

    public function validatorAlmacen($datos){
        $validator = Validator::make($datos, [
            'nombre' => 'required|string|min:4|max:255',
            'direccion' => 'required|string|min:4|max:255'
        ]);
        
        return $validator;
    }


    public function delete(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'id' => 'required|integer|exists:almacenes,id',
        ]);

        $almacen = Almacen::where('id_user', $user->id)
            ->where('id', $validated['id'])
            ->firstOrFail();

        Inventario::where('id_almacen', $almacen->id)->delete();

        $almacen->delete();

        return $this->renderInventario($user);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'id' => 'required|exists:almacenes,id',
            'nombre' => 'required|string|min:4|max:255',
            'direccion' => 'required|string|min:4|max:255',
        ]);

        $almacen = Almacen::where('id_user', $user->id)
            ->where('id', $data['id'])
            ->firstOrFail();

        $almacen->update([
            'nombre' => $data['nombre'],
            'direccion' => $data['direccion'],
        ]);

        return $this->renderInventario($user);
    }

    public function show(Request $request){
        $user = Auth::user();

        $almacenesIds = $request->input('almacenes');

        return $this->renderInventario($user,$almacenesIds);

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


    public function renderInventario($user, $almacenesIds = null)
    {
        
    $almacenesQuery = Almacen::with(['productos' => function ($query) {
        $query->withPivot('cantidad_actual', 'precio_unitario', 'fecha_entrada', 'fecha_salida');
    }])
    ->where('id_user', $user->id);

    if ($almacenesIds && is_array($almacenesIds)) {
        $almacenesQuery->whereIn('id', $almacenesIds);
    }

    // DATOS PARA LOS GRAFICOS
    $almacenes = $almacenesQuery->get()->map(function ($almacen) {
        $productos = $almacen->productos;

        $precioTotal = $productos->sum(fn($producto) =>
            $producto->pivot->cantidad_actual * $producto->pivot->precio_unitario
        );

        $cantidadTotal = $productos->sum(fn($producto) =>
            $producto->pivot->cantidad_actual
        );

        return [
            'id' => $almacen->id,
            'nombre' => $almacen->nombre,
            'direccion' => $almacen->direccion,
            'productos_count' => $productos->count(),
            'cantidad_total' => $cantidadTotal,
            'precio_total' => $precioTotal,
            'productos' => $productos->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'codigo' => $producto->codigo,
                    'nombre' => $producto->nombre,
                    'precio_unitario' => $producto->pivot->precio_unitario,
                    'cantidad_actual' => $producto->pivot->cantidad_actual,
                    'fecha_entrada' => $producto->pivot->fecha_entrada,
                    'fecha_salida' => $producto->pivot->fecha_salida,
                    'imagen' => $producto->imagen,
                ];
            })->toArray(),
        ];
    });

    $stats = $this->calcularStockStats($almacenes);

    return Inertia::render('Inventario', props: [
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
        ]);
    }
}
