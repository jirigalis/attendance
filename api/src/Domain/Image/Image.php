<?php
declare(strict_types=1);

namespace App\Domain\Image;

use App\Domain\Path\Path;
use Illuminate\Database\Eloquent\Model as Eloquent;

class Image extends Eloquent
{
    protected $table = "image";
    protected $dateFormat = "U";

    public static function boot()
    {
        parent::boot();
    }

    public function path()
    {
        return $this->hasMany(Path::class);
    }

}