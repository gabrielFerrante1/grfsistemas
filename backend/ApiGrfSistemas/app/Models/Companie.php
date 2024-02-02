<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companie extends Model
{
    use HasFactory;

    public $table = 'companies';

    public $timestamps = false;

    //Set connection database
    protected $connection = 'mysqlCompany';
}
