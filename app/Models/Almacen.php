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
        'nombre',
        'direccion',
        'id_user',
    ];

    public function inventarios()
    {
        return $this->hasMany(Inventario::class, 'id_almacen');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'inventarios', 'id_almacen', 'id_producto')
            ->withPivot('cantidad_actual');
    }
}
