<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Category;

use App\Domain\Category\Category;
use App\Domain\Category\CategoryRepository;
use App\Domain\DomainException\CannotCreateDomainRecordException;
use App\Domain\DomainException\DomainRecordNotFoundException;
use Respect\Validation\Validator as V;

class InMemoryCategoryRepository implements CategoryRepository
{
    /**
     * @var Category[]
     */
    private $categories;

    /**
     * InMemoryCategoryRepository constructor.
     *
     * @param array|null $categories
     */
    public function __construct(?array $categories = null)
    {
        $this->categories = Category::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getAll()
    {
        return $this->categories;
    }

    /**
     * {@inheritdoc}
     */
    public function getById(int $id): Category
    {
        $category = Category::find($id);
        if ($category == null) {
            throw new DomainRecordNotFoundException();
        }

        return $category;
    }

    /**
     * {@inheritdoc}
     */
    public function create(object $data): int
    {
        $valid = V::intVal()->validate($data->parent);
        // $valid = $valid && V::alnumCZ()->validate($data->name);

        if ($valid) {
            $category = new Category();
            $category->parent = $data->parent;
            $category->name = $data->name;

            $category->save();
            return $category->id;
        }

        throw new CannotCreateDomainRecordException();
    }

    /**
     * {@inheritdoc}
     */
    public function update(int $id, object $data)
    {
        $category = $this->getById($id);
        $update = false;

        if ($category->name != $data->name) {
            if (!V::alnumCZ()->validate($data->name)) {
                throw new CannotCreateDomainRecordException();
            }

            $category->name = htmlspecialchars($data->name);
            $update = true;
        }

        if ($category->parent != $data->parent) {
            $category->parent = $data->parent;
            $update = true;
        }

        if ($update) {
            $category->save();
            return 1;
        }

        return 0;
    }

    /**
     * {@inheritdoc}
     */
    public function delete(int $id)
    {
        if (!isset($this->categories[$id])) {
            throw new DomainRecordNotFoundException();
        }

        unset($this->categories[$id]);
    }

    /**
     * {@inheritdoc}
     */
    public function getByParent(int $parentId): array
    {
        $categories = Category::where('parent', $parentId)->get();
        return $categories;
    }

    /**
     * {@inheritdoc}
     */
    public function getImages(int $categoryId): array
    {
        $category = $this->getById($categoryId);
        return $category->images;
    }
}