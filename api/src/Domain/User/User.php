<?php
declare(strict_types=1);

namespace App\Domain\User;

use JsonSerializable;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Capsule\Manager as Capsule;

class User extends Eloquent
{
    protected $table = "user";

    public $timestamps = false;

    public static function boot() {
        parent::boot();
    }

}