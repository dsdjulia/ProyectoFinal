<?php

namespace Database\Seeders;

use App\Models\Comprador;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CompradorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $compradores = [
            [
                'nombre'           => 'Ana García',
                'identificacion'   => '87654321A',
                'telefono'         => '600123456',
                'email'            => 'ana.garcia@example.com',
                'direccion'        => 'Calle Mayor 10, Madrid',
                'tipo_comprador'   => 'minorista',
            ],
            [
                'nombre'           => 'Carlos Ruiz',
                'identificacion'   => '23456789B',
                'telefono'         => '600654321',
                'email'            => 'carlos.ruiz@example.com',
                'direccion'        => 'Calle Luna 5, Barcelona',
                'tipo_comprador'   => 'minorista',
            ],
            [
                'nombre'           => 'Corporación XYZ S.L.',
                'identificacion'   => 'B12345678',
                'telefono'         => '911234567',
                'email'            => 'ventas@corp.xyz',
                'direccion'        => 'Paseo de la Castellana 100, Madrid',
                'tipo_comprador'   => 'empresa',
            ],
        ];

        foreach ($compradores as $comprador) {
            Comprador::create($comprador);
        }
    }
}
