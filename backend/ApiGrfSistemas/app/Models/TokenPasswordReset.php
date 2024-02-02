<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenPasswordReset extends Model
{
    use HasFactory;

    public $table = 'token_password_resets';
     
    //Set connection database
    protected $connection = 'mysqlMain';
} 