<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Image;

use App\Domain\Category\Category;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\WrongParameterException;
use App\Domain\Image\Image;
use App\Domain\Image\ImageRepository;
use App\Domain\Path\Path;
use Respect\Validation\Validator as V;
use Illuminate\Database\Capsule\Manager as DB;

class InMemoryImageRepository implements ImageRepository
{
    /**
     * @var Image[]
     */
    private $images;

    public function __construct(?array $images = null)
    {
        $this->images = Image::all();
    }

    public function getAll()
    {
        return Image::with('path')->get();
    }

    public function getById(int $id): object
    {
        $image = Image::where('id', $id);
        if ($image == null || $image->count() == 0) {
            throw new DomainRecordNotFoundException();
        }

        return $image->with('path')->first();
    }

    public function create(object $data): int
    {
        $image = new Image();
        $image->name = $data->name;
        $image->category_id = $data->category_id;

        $image->save();
        return $image->id;
    }

    public function createBulk(array $data)
    {
        foreach ($data as $image) {
            $this->create($image);
        }

        return true;
    }

    public function update(int $id, object $data)
    {
        $image = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if (!V::alphaCZ()->validate($data->name)) {
            throw new WrongParameterException('name');
        }

        if (isset($data->name)) {
            $image->name = $data->name;
            $update = true;
        }

        if (isset($data->category_id)) {
            $image->category_id = $data->category_id;
            $update = true;
        }

        if ($update) {
            $image->save();
        }
    }

    public function delete(int $id)
    {
        $image = $this->getById($id);
        $image->delete();
    }

    public function getByCategory(int $categoryId)
    {
        $images = Image::where('category_id', $categoryId)->get();
        return $images;
    }

    public function getByCategories(object $data)
    {
        // validation
        $numericRule = V::intVal();
        $valid = V::each($numericRule)->validate($data->categories);

        if (!$valid) {
            throw new WrongParameterException('categories');
        }

        // sql for getting all child categories for given parents
        $sql = "WITH RECURSIVE CategoryTree AS (
            SELECT id, parent
            FROM category
            WHERE id IN (" . implode(',', array_fill(0, count($data->categories), '?')) . " )
            UNION ALL
            SELECT c.id, c.parent
            FROM category c
            JOIN CategoryTree ct ON c.parent = ct.id
            )
        SELECT id
            FROM CategoryTree;";

        $results = DB::select($sql, $data->categories);

        // Extract IDs into an array of unique values
        $idsArray = array_values(array_unique(array_map(function ($result) {
            return $result->id;
        }, $results)));

        // Perform the final select
        $images = Image::select('id', 'name', 'category_id')->whereIn('category_id', $idsArray)->with('path')->get();
        return $images;
    }

    public function addPath(int $imageId, $data)
    {
        $image = $this->getById($imageId);
        $image->path()->saveMany(array_map(function ($path) use ($image) {
            return new Path(['path' => $path, 'image_id' => $image->id]);
        }, $data->paths));
        return 1;
    }

    public function deletePath(int $imageId, $pathId)
    {
        $image = $this->getById($imageId);
        $image->path()->where('id', $pathId)->delete();
        return 1;
    }

    public function updatePath(int $imageId, $data)
    {
        $image = $this->getById($imageId);
        $image->path()->where('id', $data->id)->update(['path' => $data->path, 'review' => $data->review]);
        return 1;
    }
}
