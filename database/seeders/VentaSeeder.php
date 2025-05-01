<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Venta;
use App\Models\Comprador;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VentaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users       = User::pluck('id');
        $compradores = Comprador::pluck('id');

        if ($users->isEmpty()) {
            $this->command->warn('No hay usuarios en la tabla users. Ejecuta primero UserSeeder.');
            return;
        }

        if ($compradores->isEmpty()) {
            $this->command->warn('No hay registros en la tabla compradores. Ejecuta primero CompradorSeeder.');
            return;
        }

        $ventas = [
            ['fecha_venta' => Carbon::now()->subDays(18)->toDateString()],
            ['fecha_venta' => Carbon::now()->subDays(12)->toDateString()],
            ['fecha_venta' => Carbon::now()->subDays(7)->toDateString()],
            ['fecha_venta' => Carbon::now()->subDays(3)->toDateString()],
            ['fecha_venta' => Carbon::now()->toDateString()],
        ];

        foreach ($ventas as $data) {
            Venta::create([
                'id_user'       => $users->random(),
                'id_comprador'  => $compradores->random(),
                'fecha_venta'   => $data['fecha_venta'],
            ]);
        }
    }
}
