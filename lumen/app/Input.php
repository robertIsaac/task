<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 24-May-18
 * Time: 5:49 PM
 */

namespace App;
use Illuminate\Database\Eloquent\Model;


class Input extends Model
{

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function options()
    {
        return $this->hasMany('App\Option');
    }

    public function tasks()
    {
        return $this->hasMany('App\Task')->orderBy('order');
    }

}