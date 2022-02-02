<?php
declare(strict_types=1);

namespace App\Domain\MeetingDates;

use JsonSerializable;
use App\Domain\Member\Member;
use Illuminate\Database\Eloquent\Model as Eloquent;

class MeetingDates extends Eloquent {
    protected $table = "meetingdates";

    public $timestamps = false;
    
    public static function boot() {
        parent::boot();
    }
}