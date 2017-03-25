<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Mark extends Model
{
    protected $table = 'mark';
    protected $dates = ['deleted_at'];
    protected $guarded = ['created_at','updated_at'];

    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }
    public function book()
    {
        return $this->belongsTo('App\Model\Book');
    }
    public function upload()
    {
        return $this->belongsTo('App\Model\Upload');
    }
}
