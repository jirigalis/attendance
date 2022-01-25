<?php
declare(strict_types=1);

namespace App\Domain\Badge;

interface BadgeRepository {
    /**
     * @return Badge[]
     */
    public function findAll(): object;

    public function getById(int $id): Badge;

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function delete(int $id);

    public function getForAllMembers();
}