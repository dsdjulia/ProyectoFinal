<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Proveedor;
use Illuminate\Http\Request;

class ProveedoresController extends Controller
{
    //


    public function store(Request $request){
        $datos = $request->validate([
            'nombre' => 'required|string|min:1',
            'telefono' => 'required|string|min:9',
            'email' => 'required|email',
        ]);

        Proveedor::create([
            'nombre' => $datos['nombre'],
            'telefono' => $datos['telefono'],
            'email' => $datos['email'],
        ]);
    }

    public function destroy (Request $request){
        $datos = $request->validate([
            'id_proveedor' => 'required|exists:proveedores,id'
        ]);

        Proveedor::where('id',$datos['id_proveedor'])->first()->delete();
    }


    public function index()
{
    $proveedores = Proveedor::all();
    return Inertia::render('Proveedores/Index', [
        'proveedores' => $proveedores
    ]);
}

}
