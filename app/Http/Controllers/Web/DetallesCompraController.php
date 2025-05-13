<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Inventario;
use Illuminate\Http\Request;
use App\Models\DetalleCompra;
use Illuminate\Support\Facades\Auth;

class DetallesCompraController extends Controller
{
    //

    public function store(Request $request){
        $user = Auth::user();

        $datos = $request->validate([
            'codigo' => 'required|string',
            'precio_unitario' => 'required|numeric|min:0',
            'unidades' => 'required|integer|min:1',
            'fecha_compra' => 'required|date',
            'telefono' => 'required|string',
            'email' => 'required|email',
        ]);

        $producto = Producto::where('codigo', $datos['codigo'])->firstOrFail();
        $proveedor = Proveedor::where('telefono', $datos['telefono'])
            ->where('email', $datos['email'])->firstOrFail();

        $almacen = Almacen::where('id_user', $user->id)->firstOrFail();

        $compra = Compra::create([
            'id_user' => $user->id,
            'id_proveedor' => $proveedor->id,
            'fecha_compra' => $datos['fecha_compra']
        ]);

        DetalleCompra::create([
            'id_producto' => $producto->id,
            'id_compra' => $compra->id,
            'cantidad' => $datos['unidades'],
            'precio_unitario' => $datos['precio_unitario'],
            'estado' => true
        ]);

        $inventario = Inventario::where('id_producto', $producto->id)
            ->where('precio_unitario', $datos['precio_unitario'])
            ->first();

        if ($inventario) {
            $inventario->cantidad_actual += $datos['unidades'];
            $inventario->fecha_entrada = now();
            $inventario->save();
        } else {
            Inventario::create([
                'id_producto' => $producto->id,
                'id_almacen' => $almacen->id,
                'precio_unitario' => $datos['precio_unitario'],
                'cantidad_actual' => $datos['unidades'],
                'fecha_entrada' => now(),
                'fecha_salida' => null
            ]);
        }

        return redirect()->route('inventario.index');
}
}
