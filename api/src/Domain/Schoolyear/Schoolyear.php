<?php
declare(strict_types=1);

namespace App\Domain\Schoolyear;

use JsonSerializable;
use App\Domain\Member\Member;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Schoolyear extends Eloquent {
    protected $table = "schoolyear";

    public $timestamps = false;
    
    public static function boot() {
        parent::boot();
    }

    public function member() {
        return $this->belongsToMany(Member::class);
    }
}