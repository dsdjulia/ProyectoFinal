<?php

namespace App\Models;

use App\Models\Almacen;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inventario extends Model
{
    use HasFactory;

    protected $table = "inventarios";

    protected $fillable = [
        'id_producto',
        'id_user',
        'cantidad_actual',
        'fecha_entrada',
        'fecha_salida',
    ];


    public function getTotal() {
        return $this->cantidad_actual * optional($this->producto)->precio_unitario;
    }

    // Crear el modelo y migracion de almacen

    public function almacenes(){
        return $this->hasMany(Almacen::class, 'id_inventario', 'id');
    }

    public function producto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }

    public function user(){
        return $this->belongsTo(User::class, 'id_user');
    }
}
