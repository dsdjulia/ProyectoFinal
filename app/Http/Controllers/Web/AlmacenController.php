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
            return Inertia::render('Inventario',[
                'status' => false,
                'message' => 'No hay almacenes disponibles',
                'count' => $almacenes->count(),
                'data' => $almacenes,
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

    public function store(Request $request){

        $user = Auth::user();

        $data = $request->validate([
            'id_user' => $user->id,
            'nombre' => 'required | string | min:4 | max:255',
            'direccion' => 'required | string | min: 4 | max:255'
        ]);

        $almacen = Almacen::create($data);
        $almacen->save();

        $almacenes = Almacen::with('productos')
            ->where('id_user', $user->id)
            ->get();
        

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

    public function delete(Request $request){

        $user = Auth::user();

        $almacen = Almacen::where('id_user',$user->id)
            ->where('id', $request->id);

        $almacen->delete();

        $almacenes = Almacen::with('productos')
            ->where('id_user', $user->id)
            ->get();
        

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

    public function update(Request $request){
        $user = Auth::user();

        $data = $request -> validate([
            'id' => 'required',
            'nombre' => 'required | string | min:4 | max:255',
            'direccion' => 'required | string | min: 4 | max:255'
        ]);

        $almacen = Almacen::where('id_user',$user->id)
            ->where('id', $request->id);
        
        $almacen->update($data);

        $almacenes = Almacen::with('productos')
            ->where('id_user', $user->id)
            ->get();
        

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
