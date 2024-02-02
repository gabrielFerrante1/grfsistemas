<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseSystems extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $table = 'purchases_systems';

    //Set connection database
    protected $connection = 'mysqlMain';

    public function system()
    {
        return $this->hasOne(System::class, 'id', 'id_system')->select('id', 'link', 'name');
    }
}
