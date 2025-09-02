<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Path;

use App\Domain\Path\Path;
use App\Domain\Path\PathRepository;

class InMemoryPathRepository implements PathRepository
{
    private $paths;

    public function __construct(array $paths = null) {
        $this->paths = Path::all();
    }

    public function getAll() {
        return $this->paths;
    }

    public function getByImgId(int $imgId): array {
        $paths = array();
        foreach ($this->paths as $path) {
            if ($path->img_id == $imgId) {
                array_push($paths, $path);
            }
        }
        return $paths;
    }

    public function create(object $data): int {
        $path = new Path();
        $path->img_id = $data->img_id;
        $path->path = $data->path;

        $path->save();
        return $path->id;
    }

    public function createBulk(array $data) {
        foreach ($data as $path) {
            $this->create($path);
        }
    }

    public function update(int $id, object $data) {
        $path = Path::find($id);
        $path->img_id = $data->img_id;
        $path->path = $data->path;

        $path->save();
    }

    public function delete(int $id) {
        $path = Path::find($id);
        $path->delete();
    }
}