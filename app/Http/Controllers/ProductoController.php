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
        $avg = Producto::avg('precio_unitario');
        $total = Producto::sum('precio_unitario');

        return Inertia::render('Dashboard', [
            'productos' => $data,
            'precio_medio' => $avg,
            'precio_total' => $total,
        ]);
    }
}
