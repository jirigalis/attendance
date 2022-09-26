<?php
declare(strict_types=1);

namespace App\Domain\Badge;

use JsonSerializable;
use App\Domain\Member\Member;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Badge extends Eloquent {
    protected $table = "badge";

    public $timestamps = false;
    
    public static function boot() {
        parent::boot();
    }

    public function badge() {
        return $this->belongsToMany(Member::class);
    }
}