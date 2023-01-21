<?php
declare(strict_types=1);

namespace App\Domain\Member;

interface MemberRepository
{
    /**
     * @return Member[]
     */
    public function findAll(): object;

    public function listNames($schoolyearId): object;

    public function getByRole($role);

    /**
     * @param int $id
     * @return Member
     * @throws MemberNotFoundException
     */
    public function getById(int $id);

    public function getByIdAndSchoolyear(int $memberId, int $schoolyearId);

    public function getBySchoolyear(int $schoolyearId);

    //public function getByName(string $name): array;

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function getAttendance(int $memberId, int $schoolyearId);

    public function addAttendance(int $id, string $timestamp);

    public function delete(int $id);
    
    public function getMembersAddresses();

    public function getBadges($memberId);

    public function addBadge($memberId, $badgeId);

    public function exportAttendance(int $schoolyearId, array $members);
}
