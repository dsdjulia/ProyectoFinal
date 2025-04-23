<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Compra extends Model
{
    use HasFactory;

    protected $table = "compras";

    protected $fillable = [
        'fecha_compra',
        'id_user',
    ];

    public function detalleCompras(){
        return $this->hasMany(DetalleCompra::class, 'id_compra', 'id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
