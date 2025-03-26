<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DetalleVenta extends Model
{
    use HasFactory;

    protected $table = "detalle_ventas";

    protected $fillable = [
        'cantidad',
        'precio_unitario',
        'id_producto',
        'id_venta'
    ];

    public function producto(){
        return $this->belongsTo(Producto::class, 'id_producto', 'id');
    }

    public function venta(){
        return $this->belongsTo(Venta::class, 'id_venta', 'id');
    }
}
