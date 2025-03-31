<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index()
    {
        $data = Producto::with(['inventarios'])->get();
        $avg = Producto::avg('precio_unitario');
        $total = Producto::sum('precio_unitario'); # Cambiar para que pille la cantidad de productos del inventario

        return Inertia::render('Dashboard', [
            'productos' => $data,
            'precio_medio' => $avg,
            'precio_total' => $total,
        ]);
    }

    public function show(Request $request)
    {
        $data = Producto::where('id', $request->id)->get();

        return Inertia::render('Dashboard', [
            'productos' => $data,
        ]);
    }

    public function destroy(Request $request)
    {
        $producto = Producto::find($request->id);
        $productos = Producto::all();
        if ($producto) {
            $producto->delete();
            return Inertia::render('Dashboard', [
                'productos' => $productos,
            ]);
        }

        return Inertia::render('Dashboard', [
            'productos' => $productos,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_unitario' => 'required',
        ]);

        $producto = Producto::create($validated);
        $producto->save();

        $productos = Producto::all();
        return Inertia::render('Dashboard', [
            'productos' => $productos
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_unitario' => 'required',
        ]);

        $productos = Producto::all();
        $producto = Producto::find($request->id);

        if ($producto) {
            $producto->update($validated);
        } else {
            return Inertia::render('Dashboard', [
                'productos' => $productos,
            ]);
        }

            }
}
