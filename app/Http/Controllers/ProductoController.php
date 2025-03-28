<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index()
    {
        $data = Producto::with(['inventarios'])->get();
        return Inertia::render('Dashboard', [
            'productos' => $data
        ]);
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
