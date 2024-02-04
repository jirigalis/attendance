<?php
declare(strict_types=1);

namespace App\Domain\Image;

interface ImageRepository {
    public function getAll();

    public function getById(int $id);

    public function create(object $data): int;

    public function createBulk(array $data);

    public function update(int $id, object $data);

    public function delete(int $id);

    public function getByCategory(int $categoryId);

    public function getByCategories(object $categoryIds);

    public function addPath(int $id, object $path);

    public function updatePath(int $id, object $path);
}