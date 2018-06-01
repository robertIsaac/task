<?php
/**
 * Created by PhpStorm.
 * User: rober
 * Date: 24-May-18
 * Time: 5:49 PM
 */

namespace App;
use Illuminate\Database\Eloquent\Model;


class Task extends Model
{

    public $timestamps = false;

    public function input()
    {
        return $this->belongsTo('App\Input');
    }

    public function row()
    {
        return $this->belongsTo('App\Row');
    }

    public function option()
    {
        return $this->belongsTo('App\Option');
    }

}