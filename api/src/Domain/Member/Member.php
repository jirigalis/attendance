<?php
declare(strict_types=1);

namespace App\Domain\Member;

use JsonSerializable;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Capsule\Manager as Capsule;

class Member extends Eloquent
{
    protected $table = "member";

    public $timestamps = false;

    //protected $fillable = ["name", "surname"];

    /*public function __construct(Capsule $capsule, array $attributes = array()) {
        parent::__construct($attributes);
    }*/


    public static function boot() {
        parent::boot();
    }

    public function attendance() {
        return $this->hasMany('App\Domain\Attendance\Attendance');
    }

}
