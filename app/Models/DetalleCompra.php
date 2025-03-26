<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DetalleCompra extends Model
{
    use HasFactory;

    protected $table = "detalle_compras";

    protected $fillable = [
        'cantidad',
        'precio_unitario',
        'id_producto',
        'id_compra'
    ];

    public function producto(){
        return $this->belongsTo(Producto::class, 'id_producto', 'id');
    }

    public function compra(){
        return $this->belongsTo(Compra::class, 'id_compra', 'id');
    }
}
