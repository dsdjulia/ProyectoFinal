<?php

namespace Database\Seeders;

use App\Models\Compra;
use App\Models\Producto;
use App\Models\DetalleCompra;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DetalleCompraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $compras   = Compra::pluck('id');
        $productos = Producto::pluck('id');

        if ($compras->isEmpty()) {
            $this->command->warn('No hay registros en la tabla compras. Ejecuta primero CompraSeeder.');
            return;
        }

        if ($productos->isEmpty()) {
            $this->command->warn('No hay registros en la tabla productos. Ejecuta primero ProductoSeeder.');
            return;
        }

        foreach ($compras as $compraId) {
            // Para cada compra, asociamos entre 1 y 3 productos aleatorios
            $seleccion = $productos->shuffle()->take(rand(1, 3));

            foreach ($seleccion as $productoId) {
                DetalleCompra::create([
                    'id_compra'       => $compraId,
                    'id_producto'     => $productoId,
                    'cantidad'        => rand(1, 10),
                    'precio_unitario' => rand(100, 1000) / 100, // precio entre 1.00 y 10.00
                ]);
            }
        }
    }
}
