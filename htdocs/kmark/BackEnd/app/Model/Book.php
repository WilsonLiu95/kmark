<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'book';
    protected $dates = ['deleted_at'];
    protected $guarded = ['created_at','updated_at'];

    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }
    public function mark()
    {
        return $this->hasMany('App\Model\Mark');
    }
}
