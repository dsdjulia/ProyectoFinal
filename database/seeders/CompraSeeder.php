<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Compra;
use App\Models\Proveedor;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CompraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users      = User::pluck('id');
        $proveedores = Proveedor::pluck('id');

        if ($users->isEmpty()) {
            $this->command->warn('No hay usuarios en la tabla users. Ejecuta primero UserSeeder.');
            return;
        }

        if ($proveedores->isEmpty()) {
            $this->command->warn('No hay proveedores en la tabla proveedores. Ejecuta primero ProveedorSeeder.');
            return;
        }

        $compras = [
            ['fecha_compra' => Carbon::now()->subDays(20)->toDateString()],
            ['fecha_compra' => Carbon::now()->subDays(15)->toDateString()],
            ['fecha_compra' => Carbon::now()->subDays(10)->toDateString()],
            ['fecha_compra' => Carbon::now()->subDays(5)->toDateString()],
            ['fecha_compra' => Carbon::now()->toDateString()],
        ];

        foreach ($compras as $data) {
            Compra::create([
                'id_user'       => $users->random(),
                'id_proveedor'  => $proveedores->random(),
                'fecha_compra'  => $data['fecha_compra'],
            ]);
        }
    }
}
