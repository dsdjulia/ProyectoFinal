<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Categoria;
/* Carbon es una clase que extiende la funcionalidad de DateTime en PHP y permite:
obtener la fecha y hora actual, sumar o restar intervalos de tiempo,
parsear cadenas a fechas, y formatear fechas */
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'user@gmail.com')->first();

        if (!$user) {
            $this->command->warn('Usuario user@gmail.com no encontrado. Ejecuta primero UserSeeder.');
            return;
        }
    
        $categorias = [
            ['nombre' => 'comida',  'id_user' => $user->id],
            ['nombre' => 'ropa',    'id_user' => $user->id],
            ['nombre' => 'calzado', 'id_user' => $user->id],
        ];
    
        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
