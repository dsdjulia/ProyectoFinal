<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Almacen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AlmacenController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return $this->renderInventario($user);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'nombre' => 'required|string|min:4|max:255',
            'direccion' => 'required|string|min:4|max:255',
        ]);

        $data['id_user'] = $user->id;

        Almacen::create($data);

        return $this->renderInventario($user);
    }

    public function delete(Request $request)
    {
        $user = Auth::user();

        $almacen = Almacen::where('id_user', $user->id)
            ->where('id', $request->id)
            ->firstOrFail();

        $almacen->delete();

        return $this->renderInventario($user);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'id' => 'required|exists:almacenes,id',
            'nombre' => 'required|string|min:4|max:255',
            'direccion' => 'required|string|min:4|max:255',
        ]);

        $almacen = Almacen::where('id_user', $user->id)
            ->where('id', $data['id'])
            ->firstOrFail();

        $almacen->update([
            'nombre' => $data['nombre'],
            'direccion' => $data['direccion'],
        ]);

        return $this->renderInventario($user);
    }

    private function renderInventario($user)
    {
        $almacenes = Almacen::with('productos')
            ->where('id_user', $user->id)
            ->get();

        $totalProductos = $almacenes->sum(fn($almacen) => $almacen->productos->count());

        return Inertia::render('Inventario', [
            'status' => true,
            'message' => 'Almacenes encontrados',
            'count' => $almacenes->count(),
            'total_productos' => $totalProductos,
            'data' => $almacenes,
        ]);
    }
}
