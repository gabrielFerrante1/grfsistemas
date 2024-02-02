<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory; 

    public $table = 'purchases';

    //Set connection database
    protected $connection = 'mysqlMain';

    public function purchaseSystems ()
    {
        return $this->hasMany(PurchaseSystems::class, 'id_purchase', 'id');
    }
}
