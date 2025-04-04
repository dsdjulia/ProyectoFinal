<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventarios', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('id_almacen');
            $table->unsignedBigInteger('id_producto');
            $table->integer('cantidad_actual');
            $table->date('fecha_entrada')->nullable();
            $table->date('fecha_salida')->nullable();

            $table->foreign('id_producto')->references('id')->on('productos');
            $table->foreign('id_almacen')->references('id')->on('almacenes');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventarios');
    }
};
