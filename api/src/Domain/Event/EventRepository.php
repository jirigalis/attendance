<?php
declare(strict_types=1);

namespace App\Domain\Event;

interface EventRepository {
    /**
     * @return Event[]
     */
    public function findAll(): object;

    public function getOpenEvents();

    public function openRegistration(int $id);

    public function closeRegistration(int $id);

    public function getById(int $id);

    public function update(int $id, object $data);

    public function create(object $data): int;

    public function delete(int $id);

    public function addMembers(int $eventId, array $members);

    public function removeMember(int $eventId, int $member);

    public function getByMemberAndSchoolyear(int $memberId, int $schoolyearId);

    public function markParticipation(int $eventId, int $memberId, bool $participated);

    public function sendRegistrationCode(string $email);

    public function verifyToken(string $token);

    public function registerToEvent(int $eventId, int $memberId, string $token);
}