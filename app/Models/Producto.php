<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;

    protected $table = "productos";

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio_unitario',
    ];

    public function inventarios()
    {
        return $this->hasMany(Inventario::class, 'id_producto');
    }

    public function almacenes()
    {
        return $this->belongsToMany(Almacen::class, 'inventarios', 'id_producto', 'id_almacen')
            ->withPivot('cantidad_actual');
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria', 'id');
    }
}
