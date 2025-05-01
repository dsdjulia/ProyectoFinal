<?php

namespace Database\Seeders;

use App\Models\Venta;
use App\Models\Producto;
use App\Models\DetalleVenta;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DetalleVentaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ventas    = Venta::pluck('id');
        $productos = Producto::pluck('id');

        if ($ventas->isEmpty()) {
            $this->command->warn('No hay registros en la tabla ventas. Ejecuta primero VentaSeeder.');
            return;
        }

        if ($productos->isEmpty()) {
            $this->command->warn('No hay registros en la tabla productos. Ejecuta primero ProductoSeeder.');
            return;
        }

        foreach ($ventas as $ventaId) {
            // Para cada venta, asociamos entre 1 y 3 productos aleatorios
            $seleccion = $productos->shuffle()->take(rand(1, 3));

            foreach ($seleccion as $productoId) {
                DetalleVenta::create([
                    'id_venta'        => $ventaId,
                    'id_producto'     => $productoId,
                    'cantidad'        => rand(1, 5),
                    'precio_unitario' => rand(100, 1000) / 100, // precio entre 1.00 y 10.00
                ]);
            }
        }
    }
}
