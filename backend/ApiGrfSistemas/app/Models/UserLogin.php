<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogin extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $table = 'users_login';

    //Set connection database
    protected $connection = 'mysqlMain';
}
