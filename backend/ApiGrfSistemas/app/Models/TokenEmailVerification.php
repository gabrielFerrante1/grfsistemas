<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TokenEmailVerification extends Model
{
    use HasFactory;

    public $table = 'token_email_verifications';
     
    //Set connection database
    protected $connection = 'mysqlMain';
}
