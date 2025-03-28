<?php

namespace App\Http\Controllers\Api;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductoController extends Controller
{
    //
    public function index()
    {
        $data = Producto::all();
        return response()->json(
            [
                'status' => true,
                'message' => 'Listado de productos',
                'count' => count($data),
                'data' => $data
            ],
            200
        );
    }

    public function show(Request $request)
    {
        $producto = Producto::find($request->id);
        if ($producto) {
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Producto encontrado',
                    'data' => $producto
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Producto no encontrado',
                ],
                404
            );
        }
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
        return response()->json(
            [
                'status' => true,
                'message' => 'Producto creado',
                'data' => $producto
            ],
            201
        );
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_unitario' => 'required|float',
        ]);

        $producto = Producto::find($request->id);
        if ($producto) {
            $producto->update($validated);
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Producto actualizado',
                    'data' => $producto
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Producto no encontrado',
                ],
                404
            );
        }
    }

    public function destroy(Request $request)
    {
        $producto = Producto::find($request->id);
        if ($producto) {
            $producto->delete();
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Producto eliminado',
                    'data' => $producto
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'status' => false,
                    'message' => 'Producto no encontrado',
                ],
                404
            );
        }
    }
}
