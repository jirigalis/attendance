<?php
declare(strict_types=1);

namespace App\Domain\MeetingDates;

interface MeetingDatesRepository {
    /**
     * @return MeetingDates[]
     */
    public function findAll(): object;

    public function getById(int $id): MeetingDates;

    public function create($data): int;

    public function delete(int $id);

    public function getMeetingDatesCountBySchoolyear($schoolyearId);
}