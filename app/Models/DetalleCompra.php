<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DetalleCompra extends Model
{
    use HasFactory;

    protected $table = "detalle_compras";

    protected $fillable = [
        'id_producto',
        'id_compra',
        'cantidad',
        'precio_unitario',
    ];

    public function producto(){
        return $this->belongsTo(Producto::class, 'id_producto', 'id');
    }

    public function compra(){
        return $this->belongsTo(Compra::class, 'id_compra', 'id');
    }
}
