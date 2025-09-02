<?php
declare(strict_types=1);

namespace App\Domain\RemoteScreen;

use App\Domain\User\User;
use Illuminate\Database\Eloquent\Model as Eloquent;

class RemoteScreen extends Eloquent
{
    protected $table = "remote_screen";
    protected $casts = [
        'data' => 'json',
    ];
    public $timestamps = false;

    public static function boot()
    {
        parent::boot();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}