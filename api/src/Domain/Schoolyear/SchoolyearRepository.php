<?php
declare(strict_types=1);

namespace App\Domain\Schoolyear;

interface SchoolyearRepository {
    /**
     * @return Schoolyear[]
     */
    public function findAll(): object;

    public function getById(int $id): Schoolyear;

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function delete(int $id);

    public function getMembers(int $schoolyearId);

    public function addMember($schoolyearId, $memberId);

    public function setMembers($schoolyearId, $memberIds);

    public function removeMember($schoolyearId, $memberId);

    public function getCurrent();
}