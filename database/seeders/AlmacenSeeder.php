<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Almacen;
use Illuminate\Database\Seeder;

class AlmacenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            $this->command->warn('No se encontró ningún usuario en la base de datos.');
            return;
        }

        $almacenes = [
            ['nombre' => 'Almacén Central',   'direccion' => 'Calle Mayor 1, Madrid'],
            ['nombre' => 'Depósito Norte',    'direccion' => 'Calle Norte 10, Madrid'],
            ['nombre' => 'Sucursal Sur',      'direccion' => 'Avenida Sur 5, Barcelona'],
            ['nombre' => 'Centro Logístico',  'direccion' => 'Polígono Industrial 3, Valencia'],
            ['nombre' => 'Almacén Secundario','direccion' => 'Calle Falsa 123, Sevilla'],
        ];

        foreach ($almacenes as $data) {
            Almacen::create([
                'id_user'   => $user->id,
                'nombre'    => $data['nombre'],
                'direccion' => $data['direccion'],
            ]);
        }
    }
}
