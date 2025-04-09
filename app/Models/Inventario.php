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
        'id_almacen',
        'id_producto',
        'cantidad_actual',
        'fecha_entrada',
        'fecha_salida',
    ];


    public function getTotal() {
        return $this->cantidad_actual * optional($this->producto)->precio_unitario;
    }

    // Crear el modelo y migracion de almacen

    public function almacen(){
        return $this->belongsTo(Almacen::class, 'id_almacen');
    }

    public function producto(){
        return $this->belongsTo(Producto::class,'id_producto');
    }
}
