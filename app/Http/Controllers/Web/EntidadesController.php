<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EntidadesController extends Controller
{
    //

    public function index(){
        $user = Auth::user();
        $this->renderEntidades($user);
    }

    public function renderEntidades(){
        
        return Inertia::render('Entidades');
    }
}
