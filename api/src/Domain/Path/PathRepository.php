<?php
declare(strict_types=1);

namespace App\Domain\Path;

interface PathRepository {
    public function getByImgId(int $imgId);

    public function create(object $data): int;

    public function createBulk(array $data);

    public function update(int $id, object $data);

    public function delete(int $id);
}