<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\Comprador;
use App\Models\Inventario;
use App\Models\DetalleVenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DetallesVentaController extends Controller
{
    //

    public function store(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            // cliente
            'telefono' => 'required|string|min:1',
            'email' => 'required|email',
            //producto
            'codigo' => 'required|string|min:1',
            //detalles
            'cantidad' => 'required|decimal',

        ]);

        $producto = Producto::where('codigo',$datos['codigo'])->first();
        $almacen = Almacen::where('id_user',$user->id)->first();

        // Buscar o crear el comprador
        $comprador = Comprador::firstOrCreate([
            'telefono' => $datos['telefono'],
            'email' => $datos['email'],
        ]);
        
        //Busqueda de inventario
        $inventario = Inventario::where('id_producto', $producto->id)
            ->where('id_almacen', $almacen->id)
            ->where('cantidad_actual', '>=', $datos['cantidad'])
            ->orderByDesc('fecha_entrada')
            ->first();

        if (!$inventario) {
            return redirect()->back()->withErrors('No hay suficiente stock disponible para este producto.');
        }

        $margen = 0.25;
        $precioVenta = round($inventario->precio_unitario * (1 + $margen), 2);

        $venta = Venta::create([
            'id_user'=> $user->id,
            'id_comprador'=> $comprador->id,
            'fecha_venta'=> now(),
        ]);

        DetalleVenta::create([
            'id_producto' => $producto->id,
            'id_venta' =>$venta->id,
            'cantidad' => $datos['cantidad'],
            'precio_unitario' => $precioVenta
        ]);

        $inventario->cantidad_actual -= $datos['cantidad'];
        $inventario->save();

        return redirect()->route('inventario.index');

    }
}
