<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Producto;
use App\Models\Inventario;
use Illuminate\Http\Request;
use App\Models\DetalleCompra;
use Illuminate\Support\Facades\Auth;

class DetallesCompraController extends Controller
{
    //

    public function store(Request $request){
        
        $user = Auth::user();

        $validate = $request->validate([
            'codigo' => 'required|string',
            'id_almacen' => 'required|exists:almacenes,id',
            'id_proveedor' => 'required|exists:proveedores,id',
            'precio_unitario' => 'required|numeric|min:0',
            'unidades' => 'required|integer|min:1',
            'fecha_compra' =>'required|date'
        ]);

        $producto = Producto::where('codigo' , $request['codigo'])->first();

        if($producto){
            $compra = Compra::create([
                'id_user' => $user->id,
                'id_proveedor' => $request['id_proveedor'],
                'fecha_compra'=> $request['fecha_compra']
            ]);
            $detalles = DetalleCompra::create([
                'id_producto' => $producto->id,
                'id_compra' => $compra->id,
                'cantidad' => $request['unidades'],
                'precio_unitario' => $request['precio_unitario'],
                'estado'=> true
            ]);
            $inventario = Inventario::where('id_almacen', $request['id_almacen'])
                ->where('id_producto' , $producto->id)
                ->where('precio_unitario', $request['precio_unitario'])
                ->first();
            $inventario->cantidad_actual += $request['unidades'];
            $inventario->fecha_entrada = now();
            $inventario ->save();
        }

    }

    
}
