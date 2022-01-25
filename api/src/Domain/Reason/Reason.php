<?php
declare(strict_types=1);

namespace App\Domain\Reason;

use JsonSerializable;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Reason extends Eloquent {
    protected $table = "reason";

    public $timestamps = false;
    
    public static function boot() {
        parent::boot();
    }
}