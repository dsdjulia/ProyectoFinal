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

        $data = $request->validate([
            // datos para crear producto
            'id_categoria' => 'required|exists:categorias,id',
            'codigo' => 'required|string|unique:productos,codigo',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            //datos para crear inventario
            'id_almacen' => 'required|exists:almacenes,id',
            'cantidad_actual' => 'required|integer|min:1',
            'precio_unitario' => 'required|numeric|min:0',
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
            'id_almacen' => $data['id_almacen'],
            'cantidad_actual' => $data['cantidad_actual'],
            'precio_unitario' => $data['precio_unitario'],
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
