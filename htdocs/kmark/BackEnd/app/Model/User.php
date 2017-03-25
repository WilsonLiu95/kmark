<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';
    protected $dates = ['deleted_at'];
    protected $guarded = ['created_at','updated_at'];

    public function upload()
    {
        return $this->hasMany('App\Model\Upload');
    }
    public function mark()
    {
        return $this->hasMany('App\Model\Mark');
    }
    public function book()
    {
        return $this->hasMany('App\Model\Book');
    }
}
