<?php

namespace App\Http\Controllers\Api;

use App\Models\Almacen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;

class ApiAlmacenController extends Controller
{
    //
    public function index()
    {
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

        return response()->json([
            'status' => true,
            'message' => 'Almacenes encontrados',
            'data' => $almacenes,
        ]);
    }

    public function show(Request $request)
    {

        $almacen = Almacen::with(['productos'])->find($request->id);

        if (!$almacen) {
            return response()->json([
                'status' => false,
                'message' => 'Almacen no encontrado',
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Almacen encontrado',
            'data' => $almacen,
        ]);
    }
}
