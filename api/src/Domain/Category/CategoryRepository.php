<?php
declare(strict_types=1);

namespace App\Domain\Category;

interface CategoryRepository {
    public function getAll();

    public function getById(int $id);

    public function create(object $data): int;

    public function update(int $id, object $data);

    public function delete(int $id);

    public function getImages(int $id);
}