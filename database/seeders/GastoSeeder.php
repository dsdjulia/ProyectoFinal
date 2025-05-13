<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Gasto;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class GastoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener los usuarios disponibles (id)
        $users = User::pluck('id');

        if ($users->isEmpty()) {
            $this->command->warn('No hay usuarios en la tabla users. Ejecuta primero UserSeeder.');
            return;
        }

        $gastos = [
            [
                'concepto'         => 'Compra de material de oficina',
                'precio'           => 45.75,
                'fecha'            => Carbon::now()->subDays(8)->toDate(),
                'gasto_recurrente' => false,
            ],
            [
                'concepto'         => 'Pago electricidad',
                'precio'           => 120.50,
                'fecha'            => Carbon::now()->subMonth()->toDate(),
                'gasto_recurrente' => true,
            ],
            [
                'concepto'         => 'Suscripción Internet',
                'precio'           => 30.00,
                'fecha'            => Carbon::now()->subDays(5)->toDate(),
                'gasto_recurrente' => true,
            ],
            [
                'concepto'         => 'Mantenimiento de software',
                'precio'           => 200.00,
                'fecha'            => Carbon::now()->subDays(15)->toDate(),
                'gasto_recurrente' => false,
            ],
        ];

        foreach ($gastos as $data) {
            Gasto::create([
                'id_user'          => $users->random(),
                'concepto'         => $data['concepto'],
                'precio'           => $data['precio'],
                'fecha'            => $data['fecha'],
                'gasto_recurrente' => $data['gasto_recurrente'],
            ]);
        }
    }
}
