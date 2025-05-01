<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;
/* Carbon es una clase que extiende la funcionalidad de DateTime en PHP y permite:
obtener la fecha y hora actual, sumar o restar intervalos de tiempo,
parsear cadenas a fechas, y formatear fechas */
use Carbon\Carbon;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $categorias = [
            [
                'nombre'            => 'comida',
                'perecedero'        => true,
                'fecha_vencimiento' => Carbon::now()->addDays(7)->toDateString(),
            ],
            [
                'nombre'            => 'ropa',
                'perecedero'        => false,
                'fecha_vencimiento' => null,
            ],
            [
                'nombre'            => 'calzado',
                'perecedero'        => false,
                'fecha_vencimiento' => null,
            ],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
