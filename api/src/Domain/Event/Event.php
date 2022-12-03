<?php
declare(strict_types=1);

namespace App\Domain\Event;

use JsonSerializable;
use App\Domain\Member\Member;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Event extends Eloquent {
    protected $table = "event";

    public $timestamps = false;
    
    public static function boot() {
        parent::boot();
    }

    public function members() {
        return $this->belongsToMany(Member::class, 'event_attendance')->withPivot('application', 'paid', 'participated');
    }
}