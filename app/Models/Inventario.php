<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inventario extends Model
{
    use HasFactory;

    protected $table = "inventarios";

    protected $fillable = [
        'cantidad',
        'id_user',  
        'id_producto'
    ];

    public function producto(){
        return $this->belongsTo(Producto::class, 'id_producto', 'id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
