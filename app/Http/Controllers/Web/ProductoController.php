<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\Categoria;
use App\Models\Inventario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ProductoController extends Controller
{
    public function index()
    {
        //
    }

    public function show(Request $request)
    {
        //
    }

    public function delete(Request $request)
    {
        $datos = $request->validate([
            'id_producto' => 'required|exists:productos,id',
            'id_almacen' =>'required|exists:almacenes,id',
            'precio_unitario' => 'required|numeric'
        ]);

        Inventario::where('id_producto',$datos['id_producto'])
            ->where('id_almacen',$datos['id_almacen'])
            ->where('precio_unitario',$datos['precio_unitario'])
            ->first()->delete();
        
        return redirect()->route('inventario.index');

    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            // datos para crear producto
            'codigo' => 'required|string|unique:productos,codigo',
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|string',
            // 'imagen' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            //datos para crear inventario
            'id_almacen' => 'required|exists:almacenes,id',
            'cantidad_actual' => 'required|integer|min:1',
            'precio_unitario' => 'required|numeric|min:1',
            //datos para la categoria
            'id_categoria' => '',
            'nombre_categoria' => 'nullable|string',
            'perecedero' => 'nullable|boolean'
        ]);

        $categoria = Categoria::where('id',$data['id_categoria'])
            ->where('id_user',$user->id)->first();

        if(!$categoria){
            $newCategoria = Categoria::create([
                'id_user' => $user->id,
                'nombre' => $data['nombre_categoria'],
                'perecedero'=> $data['perecedero'],
                'fecha_vencimiento' => $data['perecedero'] ? now()->addDays(14)->toDate() : null
            ]);
        }

        $producto = Producto::create([
            'id_categoria' => $data['id_categoria'] ? $data['id_categoria'] : $newCategoria->id,
            'codigo' => $data['codigo'],
            'nombre'=> $data['nombre'],
            'descripcion'=> $data['descripcion'],
            'imagen'=> $data['imagen']
        ]);

        Inventario::create([
            'id_producto' => $producto->id,
            'id_almacen' => $data['id_almacen'],
            'cantidad_actual' => $data['cantidad_actual'],
            'precio_unitario' => $data['precio_unitario'],
            'fecha_entrada' => now(),
            'fecha_salida' => null
        ]);

        return redirect()->route('inventario.index');
        
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio_unitario' => 'required|decimal',
        ]);

        $producto = Producto::find($request->id);
        if ($producto) {
            $producto->update($validated);
        }

        return redirect()->route('inventario.index');
    }

    public function patch (Request $request){

        $user = Auth::user();
        $datos = $request ->validate([
            'id_almacen' => 'required|integer|exists:almacenes,id',
            'id_producto' => 'required|integer|exists:productos,id',
            'cantidad_actual' => 'required|integer'
        ]);

        $almacen = Almacen::where('id',$datos['id_almacen'])
            ->where('id_user',$user->id)
            ->first();

        $inventario = Inventario::where('id_producto', $datos['id_producto'])
            ->where('id_almacen', $almacen->id)
            ->first();

        $inventario->cantidad_actual = $datos['cantidad_actual'];
        $inventario->save();

        return redirect()->route('inventario.index');

    }
}
