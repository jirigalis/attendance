<?php
declare(strict_types=1);

namespace App\Domain\Category;

use App\Domain\Image\Image;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Eloquent
{
    protected $table = "category";

    public $timestamps = false;

    public static function boot()
    {
        parent::boot();
    }

    public function path(): HasMany
    {
        return $this->hasMany(Image::class);
    }
}