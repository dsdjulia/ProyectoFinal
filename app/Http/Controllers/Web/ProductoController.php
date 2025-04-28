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
    // CRUD PRODUCTOS CON VISTAS
    public function index()
    {

    }

    public function show(Request $request)
    {

    }

    public function destroy(Request $request)
    {

    }

    public function store(Request $request)
    {

        $user = Auth::user();

        $data = $request->validate([
            'codigo' => 'required|string|unique:productos,codigo',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'id_categoria' => 'required|exists:categorias,id',
            'id_almacen' => 'required|exists:almacenes,id',
            'cantidad_actual' => 'required|integer|min:1',
            'precio_unitario' => 'required|numeric|min:0',
        ]);

        $almacen = Almacen::where('id_user', $user->id)
            ->where('id',$data['id_almacen'])
            ->first();

        $producto = Producto::create($data);

        Inventario::create([
            'id_producto' => $producto->id,
            'id_almacen' => $data['id_almacen'],
            'cantidad_actual' => $data['cantidad_actual'],
            'precio_unitario' => $data['precio_unitario'],
            'fecha_entrada' => now(),
        ]);

        

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

        $productos = Producto::all();
        return Inertia::render('Dashboard', [
            'productos' => $productos
        ]);
    }


}
