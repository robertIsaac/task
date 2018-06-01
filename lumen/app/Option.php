<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 24-May-18
 * Time: 5:49 PM
 */

namespace App;
use Illuminate\Database\Eloquent\Model;


class Option extends Model
{
    public function input()
    {
        return $this->belongsTo('App\Input');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function tasks()
    {
        return $this->hasMany('App\Task');
    }

}