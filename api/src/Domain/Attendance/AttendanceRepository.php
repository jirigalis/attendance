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
}