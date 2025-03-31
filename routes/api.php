<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiProductoController;



// CRUD PRODUCTOS
Route::get('/productos', [ApiProductoController::class, 'index'])->name('productos.index');
Route::get('/productos/{id}', [ApiProductoController::class, 'show'])->name('productos.show');
Route::post('/productos', [ApiProductoController::class, 'store'])->name('productos.store');
Route::patch('/productos/{id}', [ApiProductoController::class, 'update'])->name('productos.update');
Route::delete('/productos', [ApiProductoController::class, 'destroy'])->name('productos.destroy');

Route::post('/login', [ApiAuthController::class, 'login'])->name('login');