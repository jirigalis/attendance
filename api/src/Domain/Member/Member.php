<?php
declare(strict_types=1);

namespace App\Domain\Member;

use JsonSerializable;
use App\Domain\Attendance\Attendance;
use App\Domain\Badge\Badge;
use App\Domain\Schoolyear\Schoolyear;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Member extends Eloquent
{
    protected $table = "member";
    protected $dateFormat = "U";

    public $timestamps = false;

    public static function boot() {
        parent::boot();
    }

    public function attendance() {
        return $this->hasMany(Attendance::class, 'member_id', 'id');
    }

    public function badge() {
        return $this->belongsToMany(Badge::class, "member_badge")->withPivot('created_at');
    }

    public function schoolyear() {
        return $this->belongsToMany(Schoolyear::class, "member_schoolyear")->withPivot('application', 'paid');
    }

}
