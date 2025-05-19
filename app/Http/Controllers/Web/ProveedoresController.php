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

        return $this->renderProveedores($user);
    }

    public function store(Request $request){
        $user = Auth::user();
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

        $this->renderProveedores($user);
    }

    public function destroy (Request $request){

        $user = Auth::user();
        
        $datos = $request->validate([
            'id_proveedor' => 'required|exists:proveedores,id'
        ]);

        Proveedor::where('id',$datos['id_proveedor'])->first()->delete();

        $this->renderProveedores($user);
    }

    public function patch(Request $request){
        $user = Auth::user(); 

        $datos = $request->validate([
            'id_proveedor' => 'required|exists:proveedores,id',
            'nombre' => 'required|string|min:1',
            'telefono' => 'required|string|min:9',
            'email' => 'required|email',
        ]);

        $proveedor = Proveedor::where('id', $datos['id_proveedor'])->first();
        $proveedor->nombre = $datos['nombre'];
        $proveedor->telefono = $datos['telefono'];
        $proveedor->email = $datos['email'];

        $proveedor->save();

        $this->renderProveedores($user);
    }

    public function renderProveedores($user){
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
            'status' => true,
            'mensaje' => 'Proveedores encontrados',
            'proveedores' => $all_proveedores
        ]);
    }
}
