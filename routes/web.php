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
use App\Http\Controllers\Web\EntidadesController;
use App\Http\Controllers\Web\SendEmaillController;
use App\Models\Proveedor;

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

// NAV
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [InventarioController::class ,'dashboard'])->name('dashboard.index');
    Route::get('/inventario', [AlmacenController::class ,'index'])->name('inventario.index');
    Route::get('/pedidos', [DetallesCompraController::class ,'index'])->name('pedidos.index');
    Route::get('/ventas', [DetallesVentaController::class ,'index'])->name('ventas.index');
    Route::get('/detalles', [ProductoController::class ,'defaultIndex'])->name('producto.default');
    Route::get('/detalles/{id}', [ProductoController::class ,'index'])->name('producto.index');
    Route::get('/proveedores', [ProveedoresController::class ,'index'])->name('proveedores.index'); 

    Route::get('/entidades', [EntidadesController::class ,'index'])->name('entidades.index'); 
});

// CRUD DE ALMACENES
Route::middleware('auth')->group(function () {
    Route::delete('/inventario', [AlmacenController::class ,'delete'])->name('inventario.delete');
    Route::post('/inventario', [AlmacenController::class ,'store'])->name('inventario.store');
    Route::patch('inventario/almacen', [AlmacenController::class ,'update'])->name('almacen.patch');
});

// CRUD DE PRODUCTOS AÑADIR Y BORRAR
Route::middleware('auth')->group(function () {
    Route::delete('/inventario/producto', [ProductoController::class ,'delete'])->name('producto.delete');
    Route::post('/inventario/producto', [ProductoController::class ,'store'])->name('producto.store');
    Route::patch('/inventario/producto', [ProductoController::class ,'patch'])->name('producto.patch');
});

// CRUD DE PEDIDOS
Route::middleware('auth')->group(function () {
    Route::post('/pedidos/add', [DetallesCompraController::class ,'addInventario'])->name('pedidos.addInventario');
    Route::delete('/pedidos', [DetallesCompraController::class ,'destroy'])->name('pedidos.destroy');
    Route::patch('/pedidos/patch', [DetallesCompraController::class ,'patch'])->name('pedidos.patchInventario');
    Route::post('/pedidos', [DetallesCompraController::class ,'store'])->name('pedidos.store');
});

//CRUD DE VENTAS
Route::middleware('auth')->group(function () {
    Route::post('/ventas', [DetallesVentaController::class ,'store'])->name('ventas.store');
    Route::delete('/ventas', [DetallesVentaController::class ,'destroy'])->name('ventas.destroy');
});

//CRUD DE PROVEEDORES
Route::middleware('auth')->group(function () {
    Route::post('/proveedor', [ProveedoresController::class ,'store'])->name('proveedor.store');
    Route::delete('/proveedor', [ProveedoresController::class ,'destroy'])->name('proveedor.destroy');
    Route::patch('/proveedor', [ProveedoresController::class ,'patch'])->name('proveedor.patch');
});

//TEST EMAIL
Route::post('/proveedor/email', [SendEmaillController::class, 'sendEmail'])->name('proveedor.email');


require __DIR__ . '/auth.php';
