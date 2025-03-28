<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ProductoController;



// CRUD PRODUCTOS

Route::get('/productos', [ProductoController::class, 'index'])->middleware('auth:sanctum')->name('productos.index');
Route::get('/productos/{id}', [ProductoController::class, 'show'])->name('productos.show');
Route::post('/productos', [ProductoController::class, 'store'])->name('productos.store');
Route::patch('/productos/{id}', [ProductoController::class, 'update'])->name('productos.update');
Route::delete('/productos', [ProductoController::class, 'destroy'])->name('productos.destroy');

Route::post('/login', [ApiAuthController::class, 'login'])->name('login');