<?php
declare(strict_types=1);

namespace App\Domain\Attendance;

use JsonSerializable;
use App\Domain\Member\Member;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Capsule\Manager as Capsule;

class Attendance extends Eloquent
{
    protected $table = "attendance";

    protected $primaryKey = null;
    
    protected $fillable = ['date'];

    public $incrementing = false;

    public $timestamps = false;

    public static function boot() {
        parent::boot();
    }

    public function member() {
        return $this->belongsTo(Member::class, "member_id", "id");
    }

}
