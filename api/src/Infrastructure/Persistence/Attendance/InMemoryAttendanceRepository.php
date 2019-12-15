<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Attendance;

use App\Domain\Attendance\Attendance;
use App\Domain\Attendance\AttendanceRepository;
use App\Domain\Attendance\CannotDeleteAttendanceException;
use App\Domain\Attendance\WrongParameterException;
use Illuminate\Database\Capsule\Manager as DB;
use Respect\Validation\Validator as V;

/**
 * 
 */
class InMemoryAttendanceRepository implements AttendanceRepository
{
	
	private $attendance;

	/**
     * InMemoryAttendanceRepository constructor.
     *
     * @param array|null $attendance
     */
	public function __construct(array $attendance = null)
	{
		$this->attendance = Attendance::all();
	}

	public function findAll(): object
	{
		return $this->attendance;
	}
	
	public function getAttendance(string $date): object {
		if (!V::date("Y-m-d")->validate($date)) {
			throw new WrongParameterException("date");
		}

		return Attendance::select('member_id')->whereDate('date', date($date))->pluck('member_id');
	}

	public function getMembersByDate(string $date): object {
		if (!V::date("Y-m-d")->validate($date)) {
			throw new WrongParameterException("date");
		}

		return $this->getAttendance($date);// ->load("member");
	}

	public function deleteAttendance(int $memberId, string $date) {
        if (!V::intVal($id)) {
            throw new MemberNotFoundException();
		}
		
		if (!V::date("Y-m-d")->validate($date)) {
			throw new CannotDeleteAttendanceException();
		}

		return Attendance::whereDate('date', date($date))->where("member_id", $memberId)->delete();
	}
}