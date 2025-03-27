<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

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

    public function total_price()
    {
        $data = Producto::all();
        $total = 0;
        foreach ($data as $producto) {
            $total += $producto->precio_unitario;
        }
        return response()->json(
            [
                'status' => true,
                'message' => "Total de precios de productos",
                'data' => $total
            ],
            200
        );
    }

    public function avg_price()
    {
        $data = Producto::all();
        $total = 0;
        foreach ($data as $producto) {
            $total += $producto->precio_unitario;
        }

        if (count($data) == 0) {
            return response()->json(
                [
                    'status' => false,
                    'message' => "No hay productos registrados",
                ],
                404
            );
        }

        $avg = $total / count($data);
        return response()->json(
            [
                'status' => true,
                'message' => "Promedio de precios de productos",
                'data' => $avg
            ],
            200
        );
    }

    public function productosPorInventario($inventarioId)
    {

        $productos = Producto::where('inventario_id', $inventarioId)->get();

        if ($productos->isEmpty()) {
            return response()->json(
                [
                    'status' => false,
                    'message' => "No se encontraron productos para el inventario con ID $inventarioId",
                ],
                404
            );
        }

        return response()->json(
            [
                'status' => true,
                'message' => "Productos relacionados con el inventario $inventarioId",
                'data' => $productos
            ],
            200
        );
    }
}
