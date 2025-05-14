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

            'id_proveedor' => 'nullable|exists:proveedor,id',
            'nombre_proveedor' => 'nullable|string',
            'telefono' => 'nullable|string',
            'email' => 'nullable|email',
        ]);

        $producto = Producto::where('codigo', $datos['codigo'])->first();
        $proveedor = Proveedor::firstOrCreate([
            'nombre' => $datos['nombre_proveedor'],
            'telefono' => $datos['telefono'],
            'email' => $datos['email'],
        ]);

        $almacen = Almacen::where('id_user', $user->id)->first();

        $compra = Compra::create([
            'id_user' => $user->id,
            'id_proveedor' => $proveedor->id,
            'fecha_compra' => now()
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
