<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Comprador;
use App\Models\DetalleVenta;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{
    //

    public function store(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'nombre' => 'nullable|string|min:1',
            'identificacion' => 'nullable|string|min:1',
            'telefono' => 'nullable|string|min:1',
            'email' => 'nullable|email',
            'direccion' => 'nullable|string|min:1',
            'tipo_comprador' => 'in:particular,empresa',
        ]);

        $comprador = Comprador::create([
            'nombre' => $datos['nombre'],
            'identificacion' =>$datos['identificacion'],
            'telefono' => $datos['telefono'],
            'email' =>$datos['email'] ,
            'direccion' =>$datos['direccion'] ,
            'tipo_comprador' => $datos['tipo_comprador'],
        ]);
    }

    public function destroy(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'id_cliente' => 'required| exists:compradores,id',
        ]);

        $cliente = Comprador::where('id',$datos['id_cliente'])->first();
        
        $cliente->delete();

    }


    public function patch(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'id_cliente' => 'required| exists:compradores,id',
            'nombre' => 'nullable|string|min:1',
            'identificacion' => 'nullable|string|min:1',
            'telefono' => 'nullable|string|min:1',
            'email' => 'nullable|email',
            'direccion' => 'nullable|string|min:1',
            'tipo_comprador' => 'in:particular,empresa',
        ]);

        $cliente = Comprador::where('id',$datos['id_cliente'])->first();

        $cliente->nombre = $datos['nombre'];
        $cliente->identificacion = $datos['identificacion'];
        $cliente->telefono = $datos['telefono'];
        $cliente->email = $datos['email'];
        $cliente->direccion = $datos['direccion'];
        $cliente->tipo_comprador = $datos['tipo_comprador'];

    }

    public function renderClientes($user){
        $detallesVentasRaw = DetalleVenta::with(['producto', 'venta.comprador'])
            ->whereHas('venta', function ($query) use ($user) {
                $query->where('id_user', $user->id);
            })
            ->get();

        $detallesVentas = $detallesVentasRaw->map(function ($detalle) {
            return [
                'id_detalle' => $detalle->id,
                'producto_id' => $detalle->id_producto,
                'codigo' => $detalle->producto->codigo,
                'nombre' => $detalle->producto->nombre,
                'precio_unitario' => $detalle->precio_unitario,
                'cantidad' => $detalle->cantidad,
                'fecha_venta' => optional($detalle->venta)->fecha_venta,
                'cliente' => optional($detalle->venta->comprador)->nombre,
            ];
        });

        $allClientes = $detallesVentasRaw
            ->pluck('venta.comprador') 
            ->filter() 
            ->unique('id') 
            ->values();

        return Inertia::render('Clientes' , [
            'all_clientes' => $allClientes,
            'detalles_ventas' => $detallesVentas
        ]);
    }
}
