<?php

declare(strict_types=1);

namespace App\Domain\Path;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Path extends Eloquent
{
    protected $table = "path";
    protected $dateFormat = "U";
    protected $fillable = ['path'];

    public static function boot()
    {
        parent::boot();
    }

    public function setUpdatedAt($value)
    {
        // Do nothing.
    }

    public function getUpdatedAtColumn()
    {
        return null;
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }
}
