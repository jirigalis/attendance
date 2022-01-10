<?php
declare(strict_types=1);

namespace App\Domain\Member;

use JsonSerializable;
use App\Domain\Attendance\Attendance;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Member extends Eloquent
{
    protected $table = "member";

    public $timestamps = false;

    public static function boot() {
        parent::boot();
    }

    public function attendance() {
        return $this->hasMany(Attendance::class, 'member_id', 'id');
    }

}
