<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoriasController extends Controller
{
    //  

    public function store(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'nombre' => 'required|string|min:1',
            'perecedero' => 'required|boolean',
            'fecha_vencimiento' => 'nullable|date',
        ]);

        Categoria::create([
            'id_user' => $user->id,
            'nombre' => $datos['nombre'],
            'perecedero' => $datos['perecedero'],
            'fecha_vencimiento' => $datos['fecha_vencimiento'],
        ]);

        return redirect()->route('inventario.index');

    }   

    public function destroy (Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'id_categoria' => 'required|exists:categoria,id'
        ]);

        $categoria = Categoria::where('id',$datos['id_categoria'])
        ->where('id_user',$user->id)
        ->first();

        $categoria->delete();

        return redirect()->route('inventario.index');

    }
}
