<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Web\ProfileController;
use App\Http\Controllers\Web\ProductoController;


// CRUD PRODUCTOS CON VISTAS
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [ProductoController::class, 'index'])->middleware('auth')->name('dashboard.index');
    Route::get('/producto/{id}', [ProductoController::class, 'show'])->middleware('auth')->name('dashboard.show');
    Route::delete('/producto/{id}', [ProductoController::class, 'destroy'])->middleware('auth')->name('dashboard.destroy');
    Route::post('/producto', [ProductoController::class, 'store'])->middleware('auth')->name('dashboard.store');
    Route::patch('/producto/{id}', [ProductoController::class, 'update'])->middleware('auth')->name('dashboard.update');
});

// NAVEGACIÓN
Route::middleware('auth')->group(function () {
    Route::get('create', [ProductoController::class, 'create'])->name('create');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
