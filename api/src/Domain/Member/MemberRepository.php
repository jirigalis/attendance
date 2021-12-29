<?php
declare(strict_types=1);

namespace App\Domain\Member;

interface MemberRepository
{
    /**
     * @return Member[]
     */
    public function findAll(): object;

    /**
     * @param int $id
     * @return Member
     * @throws MemberNotFoundException
     */
    public function getById(int $id): Member;

    //public function getByName(string $name): array;

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function getAttendance(int $id);

    public function delete(int $id);
    
    public function getMembersAddresses();
}
