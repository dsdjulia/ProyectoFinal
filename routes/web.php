<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductoController;



Route::get('/dashboard', [ProductoController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('productos')->middleware('auth')->group(function () {
    Route::get('/total-price', [ProductoController::class, 'index'])->name('productos.total_price');
    Route::get('/avg-price', [ProductoController::class, 'avg_price'])->name('productos.avg_price');
});

require __DIR__ . '/auth.php';
