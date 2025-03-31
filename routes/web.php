<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductoController;


// CRUD PRODUCTOS CON VISTAS
Route::get('/dashboard', [ProductoController::class, 'index'])->middleware('auth')->name('dashboard');
Route::get('/producto/{id}', [ProductoController::class, 'show'])->middleware('auth')->name('dashboard.show');
Route::delete('/producto/{id}', [ProductoController::class, 'destroy'])->middleware('auth')->name('dashboard.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
