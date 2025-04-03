<?php

use App\Http\Controllers\Web\NavegacionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\ProfileController;
use App\Http\Controllers\Web\ProductoController;


// CRUD PRODUCTOS CON VISTAS
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [ProductoController::class, 'index'])->name('dashboard.index');
    Route::get('/producto/{id}', [ProductoController::class, 'show'])->name('dashboard.show');
    Route::delete('/producto/{id}', [ProductoController::class, 'destroy'])->name('dashboard.destroy');
    Route::post('/producto', [ProductoController::class, 'store'])->name('dashboard.store');
    Route::patch('/producto/{id}', [ProductoController::class, 'update'])->name('dashboard.update');
});

// EDIT PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});





require __DIR__ . '/auth.php';
