<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use App\Models\DetalleCompra;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class ProveedoresController extends Controller
{
    //
    public function index(){
        $user = Auth::user();
        $detallesComprasRaw = DetalleCompra::with(['producto', 'compra.proveedor'])
            ->whereHas('compra', function ($query) use ($user){
                $query->where('id_user', $user->id);
            })
            ->get();

        $all_proveedores = $detallesComprasRaw
            ->pluck('compra.proveedor')
            ->filter()
            ->unique('id')
            ->values();
        return Inertia::render('Proveedores', [
            'proveedores' => $all_proveedores
        ]);
    }

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


}
