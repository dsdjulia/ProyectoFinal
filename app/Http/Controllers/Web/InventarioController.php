<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Models\Inventario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Almacen;

class InventarioController extends Controller
{
    //

    public function index(){

        $user = Auth::user();
    }
    
}
