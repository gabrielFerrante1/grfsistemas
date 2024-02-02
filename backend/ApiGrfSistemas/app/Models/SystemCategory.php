<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemCategory extends Model
{
    use HasFactory;

    public $table = 'systems_categories';
    
    public $timestamps = false;

    //Set connection database
    protected $connection = 'mysqlMain';
}
