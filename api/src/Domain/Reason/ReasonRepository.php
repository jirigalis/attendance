<?php
declare(strict_types=1);

namespace App\Domain\Reason;

interface ReasonRepository {
    /**
     * @return Reason[]
     */
    public function findAll(): object;

    public function getById(int $id): Reason;

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function delete(int $id);
}