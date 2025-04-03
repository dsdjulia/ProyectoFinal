<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductoController extends Controller
{
    // CRUD PRODUCTOS CON VISTAS
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

        if ($producto) {
            $producto->delete();
        }

        $productos = Producto::all();

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
        
        $productos = Producto::all();
        return redirect()->route('dashboard.index')->with('success', 'Producto agregado correctamente.');

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
