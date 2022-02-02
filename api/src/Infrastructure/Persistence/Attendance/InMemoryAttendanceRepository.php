<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Attendance;

use App\Domain\Attendance\Attendance;
use App\Domain\MeetingDates\MeetingDates;
use App\Domain\Member\Member;
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
        if (!V::intVal()->validate($id)) {
            throw new MemberNotFoundException();
		}

		if (!V::date("Y-m-d")->validate($date)) {
			throw new CannotDeleteAttendanceException();
		}

		return Attendance::whereDate('date', date($date))->where("member_id", $memberId)->delete();
	}

    public function getMembersByAttendanceOrder(): object {
        $members = Member::select("id", "name", "surname")
            ->withCount('attendance')
            ->orderby("attendance_count", "desc")
            ->take(10);
        
        return $members->get();
    }
}