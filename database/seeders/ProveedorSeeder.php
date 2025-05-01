<?php

namespace Database\Seeders;

use App\Models\Proveedor;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProveedorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $proveedores = [
            [
                'nombre'  => 'Distribuciones López',
                'telefono'=> '912345678',
                'email'   => 'contacto@dlopez.es',
            ],
            [
                'nombre'  => 'Insumos Alimenticios S.A.',
                'telefono'=> '918765432',
                'email'   => 'ventas@insumosalimenta.com',
            ],
            [
                'nombre'  => 'Calzados Martínez',
                'telefono'=> '916543210',
                'email'   => 'info@calzmartinez.es',
            ],
        ];

        foreach ($proveedores as $prov) {
            Proveedor::create($prov);
        }
    }
}
