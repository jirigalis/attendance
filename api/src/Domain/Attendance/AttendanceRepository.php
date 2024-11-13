<?php
declare(strict_types=1);

namespace App\Domain\Attendance;

interface AttendanceRepository {
	/**
     * @return Attendance[]
     */
	public function findAll(): object;

	public function getAttendance(string $date): object;

	public function getMembersByDate(string $date): object;

	public function addAttendanceForMembers(string $date, object $data): int;

    public function getMembersByAttendanceOrder(int $schoolyearId): object;

	public function getAttendancePoints(int $memberId): int;

	public function getAttendancePointsBySchoolyear(int $memberId, int $schoolyearId): int;

	public function getAverageAttendanceForSchoolyear(int $schoolyearId);
}