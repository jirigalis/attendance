<?php
declare(strict_types=1);

namespace App\Domain\Points;

interface PointsRepository {
    /**
     * @return Points[]
     */
    public function findAll(): object;

    public function getById(int $id): Points;

    public function getByMember(int $memberId);

    public function getSumByMember(int $memberId);

    public function getSumForAllMembers();

    public function getSumForAllMembersBySchoolyear($schoolyearId);

    public function getOverallSumForAllMembersBySchoolyear($schoolyearId);
    
    public function getSumForAllMembersByRole($role);

    public function getPublicSum($schoolyearId);

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function createBulk(array $data): int;

    public function delete(int $id);
}