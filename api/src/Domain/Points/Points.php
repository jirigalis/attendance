<?php
declare(strict_types=1);

namespace App\Domain\Points;

use JsonSerializable;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Points extends Eloquent {
    protected $table = "points";
    protected $dateFormat = "U";
    
    public static function boot() {
        parent::boot();
    }

    public function setUpdatedAt($value) {
        // Do nothing.
    }

    public function getUpdatedAtColumn() {
        return null;
    }

}