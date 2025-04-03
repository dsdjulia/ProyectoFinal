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
        'id_user',
    ];

    public function inventarios(){
        return $this->hasMany(Inventario::class, 'id_almacen');
    }


}
