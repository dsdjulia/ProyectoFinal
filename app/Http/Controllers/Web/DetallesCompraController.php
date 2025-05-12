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

        ]);

        $producto = Producto::where('codigo' , $request['codigo'])->first();

        if($producto){
            
            $inventario = Inventario::where('id_almacen', $request['id_almacen'])
                ->where('id_producto' , $producto->id)
                ->where('precio_unitario', $request['precio_unitario'])
                ->get();

            $inventario->cantidad_actual = $request['unidades'];
            
            Compra::create($validate);
            DetalleCompra::create($validate);
        }





    }

    
}
