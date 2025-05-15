<?php

namespace Database\Seeders;

use App\Models\Producto;
use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener las categorías en un array asociativo (nombre => id)
        $categorias = Categoria::pluck('id', 'nombre');

        if ($categorias->isEmpty()) {
            $this->command->warn('No hay registros en la tabla categorias. Ejecuta primero CategoriaSeeder.');
            return;
        }

        $productos = [
            [
                'categoria'   => 'comida',
                'codigo'      => 'COM001',
                'nombre'      => 'Manzana',
                'descripcion' => 'Manzana roja fresca',
                'perecedero'  => true,
            ],
            [
                'categoria'   => 'comida',
                'codigo'      => 'COM002',
                'nombre'      => 'Pan',
                'descripcion' => 'Pan integral recién horneado',
                'perecedero'  => true,
            ],
            [
                'categoria'   => 'ropa',
                'codigo'      => 'ROP001',
                'nombre'      => 'Camiseta',
                'descripcion' => 'Camiseta de algodón unisex',
                'perecedero'  => false,
            ],
            [
                'categoria'   => 'ropa',
                'codigo'      => 'ROP002',
                'nombre'      => 'Pantalón',
                'descripcion' => 'Pantalón vaquero slim fit',
                'perecedero'  => false,
            ],
            [
                'categoria'   => 'calzado',
                'codigo'      => 'CAL001',
                'nombre'      => 'Zapatillas',
                'descripcion' => 'Zapatillas deportivas cómodas',
                'perecedero'  => false,
            ],
            [
                'categoria'   => 'calzado',
                'codigo'      => 'CAL002',
                'nombre'      => 'Botas',
                'descripcion' => 'Botas de cuero resistentes',
                'perecedero'  => false,
            ],
        ];

        foreach ($productos as $item) {
            Producto::create([
                'id_categoria' => $categorias[$item['categoria']] ?? null,
                'codigo'       => $item['codigo'],
                'nombre'       => $item['nombre'],
                'descripcion'  => $item['descripcion'],
                'perecedero'   => $item['perecedero'],
                'imagen'       => 'sin-imagen.png',
            ]);
        }
    }
}
