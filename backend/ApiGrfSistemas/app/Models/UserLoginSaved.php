<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLoginSaved extends Model
{
    use HasFactory;
    
    public $table = 'users_logins_saved';

    //Set connection database
    protected $connection = 'mysqlMain';

    public function user ()
    {
        return $this->hasOne(User::class, 'id', 'user_id')->select('id', 'name', 'avatar', 'email');
    }
}
