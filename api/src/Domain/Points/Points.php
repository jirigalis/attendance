<?php
declare(strict_types=1);

namespace App\Domain\Points;

use JsonSerializable;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Points extends Eloquent {
    protected $table = "points";

    public $timestamps = false;
    
    public static function boot() {
        parent::boot();
    }
}