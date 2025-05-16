<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\AlmacenController;
use App\Http\Controllers\Web\ProfileController;

use App\Http\Controllers\Web\ProductoController;
use App\Http\Controllers\Web\InventarioController;
use App\Http\Controllers\Web\ProveedoresController;
use App\Http\Controllers\Web\DetallesVentaController;
use App\Http\Controllers\Web\DetallesCompraController;


// EDIT PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// LOGIN
Route::get('/', function () {
    return Inertia::render('Auth/Login');
});


// CRUD DE ALMACENES
Route::get('/inventario', [AlmacenController::class ,'index'])->name('inventario.index');
Route::delete('/inventario', [AlmacenController::class ,'delete'])->name('inventario.delete');
Route::post('/inventario', [AlmacenController::class ,'store'])->name('inventario.store');


// CRUD DE PRODUCTOS AÑADIR Y BORRAR
Route::delete('/inventario/producto', [ProductoController::class ,'delete'])->name('producto.delete');
Route::post('/inventario/producto', [ProductoController::class ,'store'])->name('producto.store');
Route::patch('/inventario/producto', [ProductoController::class ,'patch'])->name('producto.patch');
Route::get('/inventario/producto', [AlmacenController::class ,'getProduct'])->name('producto.show');

//Route::update('/inventario/producto', [AlmacenController::class ,'update'])->name('producto.edit');
Route::get('/pedidos', [DetallesCompraController::class ,'index'])->name('pedidos.index');
Route::post('/pedidos', [DetallesCompraController::class ,'store'])->name('pedidos.store');
Route::post('/pedidos/add', [DetallesCompraController::class ,'addInventario'])->name('pedidos.addInventario');

Route::patch('/pedidos/patch', [DetallesCompraController::class ,'patch'])->name('pedidos.patchInventario');


Route::get('/dashboard', [InventarioController::class ,'dashboard'])->name('dashboard.index');
Route::get('/ventas', [DetallesVentaController::class ,'index'])->name('ventas.index');
Route::get('/proveedores', [ProveedoresController::class ,'index'])->name('proveedores.index');


require __DIR__ . '/auth.php';
