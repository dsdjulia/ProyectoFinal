<?php

namespace App\Http\Controllers\Web;

use App\Models\Gasto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class GastoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = Auth::user();
        
        $datos = $request->validate([
            'concepto' => 'required|string|min:1',
            'precio' => 'required|decimal',
            'fecha' => 'required|date',
            'gasto_recurrente'=> 'required|boolean'
        ]);

        Gasto::create([
            'id_user'=> $user->id,
            'concepto' => $datos['concepto'],
            'precio' => $datos['precio'] ,
            'fecha' => $datos['fecha'],
            'gasto_recurrente'=> $datos['gasto_recurrente']
        ]);
    }

    public function destroy(Request $request)
    {
        $user = Auth::user();
        $datos = $request->validate([
            'id_gasto' => 'required|exists:gasto,id',
        ]);

        Gasto::where('id',$datos['id_gasto'])
            ->where('id_user',$user->id)->first()->delete();
    }
}
