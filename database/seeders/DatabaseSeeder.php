<?php

namespace Database\Seeders;

use App\Models\Producto;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'giddon',
            'email' => 'giddon@gmail.com',
            'password' => bcrypt('password'),
        ]);

        Producto::create([
            'nombre' => 'Ordenador portátil',
            'descripcion' => "Ordenador portátil de 15 pulgadas",
            'precio_unitario' => 750,
        ]);

        Producto::create([
            'nombre' => 'Ratón razer',
            'descripcion' => "Ratón inalámbrico",
            'precio_unitario' => 40.99,
        ]);

        Producto::create([
            'nombre' => 'Teclado logitech',
            'descripcion' => "Teclado mecánico",
            'precio_unitario' => 50.99,
        ]);
    }
}
