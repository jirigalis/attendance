<?php
declare(strict_types=1);

namespace App\Domain\Event;

interface EventRepository {
    /**
     * @return Event[]
     */
    public function findAll(): object;

    public function getById(int $id);

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function delete(int $id);

    public function addMembers(int $eventId, array $members);

    public function removeMember(int $eventId, int $member);
}