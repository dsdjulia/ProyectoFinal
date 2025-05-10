<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\Inventario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductoController extends Controller
{
    public function index()
    {
        //
    }

    public function show(Request $request)
    {
        //
    }

    public function delete(Request $request)
    {
        $request->validate([
            'codigo' => 'required|exists:productos,id',
        ]);

        $producto = Producto::findOrFail($request->codigo);

        $almacen = $producto->almacenes()->firstOrFail(); 
        $producto->delete();

        return app(AlmacenController::class)->renderInventario($almacen->user);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        dd($request);

        $data = $request->validate([
            'codigo' => 'required|string|unique:productos,codigo',
            'producto' => 'required|string',
            'descripcion' => 'nullable|string',
            // 'id_categoria' => 'required|exists:categorias,id',
            'almacen' => 'required|exists:almacenes,id',
            'existencias' => 'required|integer|min:1',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $producto = Producto::create([
            'id_categoria' => $data['id_categoria'],
            'codigo' => $data['codigo'],
            'nombre'=> $data['nombre'],
            'descripcion'=> $data['descripcion'],
            'imagen'=> $data['imagen']
        ]);

        Inventario::create([
            'id_producto' => $producto->id,
            'id_almacen' => $data['_almacen'],
            'cantidad_actual' => $data['existencias'],
            'precio_unitario' => $data['precio'],
            'fecha_entrada' => now(),
            'fecha_salida' => null
        ]);

        return app(AlmacenController::class)->renderInventario($user);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_unitario' => 'required',
        ]);

        $producto = Producto::find($request->id);
        if ($producto) {
            $producto->update($validated);
        }

        $almacen = $producto->almacenes()->firstOrFail();

        return app(AlmacenController::class)->renderInventario($almacen->user);
    }
}
