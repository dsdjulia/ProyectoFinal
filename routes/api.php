<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductoController;



// CRUD PRODUCTOS
Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
// Route::get('/productos/{id}', [ProductoController::class, 'show'])->name('productos.show'); 
// Route::post('/productos', [ProductoController::class, 'store'])->name('productos.store');
// Route::put('/productos/{id}', [ProductoController::class, 'update'])->name('productos.update');
// Route::delete('/productos/{id}', [ProductoController::class, 'destroy'])->name('productos.destroy');

// DATOS PRECIO
Route::get('/productos/total-price', [ProductoController::class, 'total_price'])->name('productos.total_price');
Route::get('/productos/avg-price', [ProductoController::class, 'avg_price'])->name('productos.avg_price');