<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Almacen extends Model
{
    //
    use HasFactory;

    protected $table = "almacenes";

    protected $fillable = [
        'id_inventario',
        'nombre',
        'direccion',
    ];

    public function inventario()
    {
        return $this->belongsTo(Inventario::class, 'id_inventario', 'id');
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'inventarios', 'id_almacen', 'id_producto')
            ->withPivot('cantidad_actual');
    }
}
