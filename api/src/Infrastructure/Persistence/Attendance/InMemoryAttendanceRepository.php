<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Attendance;

use App\Domain\Attendance\Attendance;
use App\Domain\MeetingDates\MeetingDates;
use App\Domain\Member\Member;
use App\Domain\Schoolyear\Schoolyear;
use App\Domain\Attendance\AttendanceRepository;
use App\Domain\Attendance\CannotDeleteAttendanceException;
use App\Domain\Member\MemberNotFoundException;
use App\Domain\Member\WrongParameterException;
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

		return $this->getAttendance($date);
	}

	public function addAttendanceForMembers(string $dateStr, array $members) {
        if (!V::date("Y-m-d")->validate($dateStr)) {
            throw new WrongParameterException("date");
		}

		if (empty($members)) {
			throw new MemberNotFoundException();
		}

		$str = "";
        $date = date("Y-m-d", strtotime($dateStr));

        $meetingDateCount = MeetingDates::where("date", $date)->get()->count();
        if ($meetingDateCount == 0) {
            $md = new MeetingDates();
            $md->date = $date;
            $md->save();
        }

		foreach ($members as $m) {
			$member = Member::find($m);
			$count = $member->attendance()->where("member_id", $member->id)->where("date", $date)->get()->count();
			if ($count == 0) {
				$member->attendance()->create(["member_id" => $m, "date" => $date]);
			}			
		}
		return $count;
	}

	public function deleteAttendance(int $memberId, string $date) {
        if (!V::intVal()->validate($memberId)) {
            throw new MemberNotFoundException();
		}

		if (!V::date("Y-m-d")->validate($date)) {
			throw new CannotDeleteAttendanceException();
		}

		return Attendance::whereDate('date', date($date))->where("member_id", $memberId)->delete();
	}

    /**
     * Get attendance points for member of given member ID. 
     * Two attendaces for one point, rounded down (3 attendances = 1 points, 4 att. = 2 points)
     */
    public function getAttendancePoints(int $memberId): int {
        return intval(Attendance::where("member_id", $memberId)->get()->count()/2);
    }

	/**
	 * Get attendance points for member in selected schoolyear. Points = count of attendance / 2 rounded down.
	 */
	public function getAttendancePointsBySchoolyear(int $memberId, int $schoolyearId): int {
		$schoolyear = Schoolyear::find($schoolyearId);

		return intval(Attendance::where("member_id", $memberId)
			->whereBetween("date", [$schoolyear->startDate, $schoolyear->endDate])->get()->count());
	}

    public function getMembersByAttendanceOrder(int $schoolyearId): object {
		$schoolyear = Schoolyear::find($schoolyearId);
        $members = Member::select("id", "name", "surname")
            ->withCount(['attendance' => function ($query) use ($schoolyear) {
				$query->whereBetween('attendance.date', [$schoolyear->startDate, $schoolyear->endDate]);
			}])
			->orderby("attendance_count", "desc")
            ;
        
        return $members->get();
    }

	public function getAverageAttendanceForSchoolyear(int $schoolyearId) {
		$schoolyear = Schoolyear::find($schoolyearId);

		$counts = Attendance::
			select('date', DB::raw('count("date") as dateCount'))
			->whereBetween('date', [$schoolyear->startDate, $schoolyear->endDate])
			->groupBy('date')
			->orderBy('date')
			// ->count('date')
			;

		return $counts->get();
	}
}