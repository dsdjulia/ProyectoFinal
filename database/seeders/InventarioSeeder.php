<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Almacen;
use App\Models\Producto;
use App\Models\Inventario;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class InventarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener productos y almacenes disponibles
        $productos = Producto::pluck('id');
        $almacenes = Almacen::pluck('id');

        if ($productos->isEmpty()) {
            $this->command->warn('No hay productos en la tabla productos. Ejecuta primero ProductoSeeder.');
            return;
        }

        if ($almacenes->isEmpty()) {
            $this->command->warn('No hay almacenes en la tabla almacenes. Ejecuta primero AlmacenSeeder.');
            return;
        }

        foreach ($productos as $productoId) {
            // Para cada producto asignamos entre 1 y 3 almacenes aleatorios
            $seleccionAlmacenes = $almacenes->shuffle()->take(rand(1, 3));

            foreach ($seleccionAlmacenes as $almacenId) {
                $fechaEntrada = Carbon::now()->subDays(rand(1, 30))->toDateString();
                // A veces no hay salida; si la hay, será de 1 a 30 días después de la entrada
                $fechaSalida = rand(0, 1)
                    ? Carbon::parse($fechaEntrada)->addDays(rand(1, 30))->toDateString()
                    : null;

                Inventario::create([
                    'id_producto'      => $productoId,
                    'id_almacen'       => $almacenId,
                    'precio_unitario'  => rand(100, 1000) / 100, // entre 1.00 y 10.00
                    'cantidad_actual'  => rand(1, 100),
                    'fecha_entrada'    => $fechaEntrada,
                    'fecha_salida'     => $fechaSalida,
                ]);
            }
        }
    }
}
