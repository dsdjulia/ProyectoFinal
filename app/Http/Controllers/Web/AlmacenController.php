<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Almacen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AlmacenController extends Controller
{
    //

    public function index(){
        $user = Auth::user();

        $almacenes = Almacen::with('productos')
            ->where('id_user', $user->id)
            ->get();

        if ($almacenes->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No hay almacenes disponibles para este usuario',
            ]);
        }

        $totalProductos = $almacenes->sum(function ($almacen) {
            return $almacen->productos->count();
        });

        return Inertia::render('Inventario',[
            'status' => true,
            'message' => 'Almacenes encontrados',
            'count' => $almacenes->count(),
            'total_productos' => $totalProductos,
            'data' => $almacenes,
        ]);
    }
}
