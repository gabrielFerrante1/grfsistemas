<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartSystems extends Model
{
    use HasFactory;

    public $timestamps = false;
    
    public $table = 'cart_systems';

    //Set connection database
    protected $connection = 'mysqlMain';
}
