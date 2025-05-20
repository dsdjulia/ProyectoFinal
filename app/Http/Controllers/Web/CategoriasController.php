<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    //  

    public function store(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'nombre' => 'required|string|min:1',
        ]);

        Categoria::create([
            'id_user' => $user->id,
            'nombre' => $datos['nombre'],
        ]);

        return redirect()->route('inventario.index');

    }   

    public function destroy (Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'id_categoria' => 'required|exists:categorias,id'
        ]);

        $categoria = Categoria::where('id',$datos['id_categoria'])
        ->where('id_user',$user->id)
        ->first();

        $categoria->delete();

        return redirect()->route('inventario.index');

    }

    public function patch(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'id_categoria' => 'required|exists:categorias,id',
            'nombre' => 'required|string|min:1'
        ]);

        $categoria = Categoria::where('id_user',$user->id)
            ->where('nombre',$datos['nombre'])
            ->first();

        $categoria->nombre = $datos['nombre'];
        $categoria->save();
    }

    public function renderCategorias($user){
        $categorias = Categoria::where('id_user', $user->id)->with('productos')->get();

        return Inertia::render('Categorias', [
            'all_categorias' => $categorias
        ]);
    }
}
