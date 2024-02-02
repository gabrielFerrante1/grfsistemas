<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    //Set connection database
    protected $connection = 'mysqlMain';
 
    public function getSystems () 
    {
        return $this->hasMany(CartSystems::class, 'id_cart', 'id')->select('id', 'id_system', 'id_plan');
    }
}
