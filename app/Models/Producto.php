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
        'precio_unitario'
    ];

    public function inventarios(){
        return $this->hasMany(Inventario::class, 'id_producto', 'id');
    }
}
