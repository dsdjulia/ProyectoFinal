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

    public function avg_price()
    {
        $avg = Producto::avg('precio_unitario');
        return response()->json(
            [
                'status' => true,
                'message' => "Media de precios de productos",
                'data' => $avg
            ],
            200
        );
    }

    public function total_price()
    {
        $total = Producto::with('inventarios')
            ->get()
            ->sum(function ($producto) {
                return $producto->precio_unitario * $producto->inventarios->sum('cantidad');
            });
        return response()->json(
            [
                'status' => true,
                'message' => "Precio total de productos",
                'data' => $total
            ],
            200
        );
    }
}
