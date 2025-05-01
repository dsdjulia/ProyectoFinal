<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Almacen;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AlmacenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::pluck('id');

        if ($users->isEmpty()) {
            $this->command->warn('No hay usuarios en la tabla users. Ejecuta primero UserSeeder.');
            return;
        }

        $almacenes = [
            ['nombre'    => 'Almacén Central', 'direccion' => 'Calle Mayor 1, Madrid'],
            ['nombre'    => 'Depósito Norte',   'direccion' => 'Calle Norte 10, Madrid'],
            ['nombre'    => 'Sucursal Sur',     'direccion' => 'Avenida Sur 5, Barcelona'],
        ];

        foreach ($almacenes as $data) {
            Almacen::create([
                'id_user'   => $users->random(),
                'nombre'    => $data['nombre'],
                'direccion' => $data['direccion'],
            ]);
        }
    }
}
