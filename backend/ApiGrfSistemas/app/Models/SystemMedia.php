<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemMedia extends Model
{
    use HasFactory;

    public $table = 'systems_medias';

    public $timestamps = false; 

    //Set connection database
    protected $connection = 'mysqlMain';
}
