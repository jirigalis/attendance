<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Points;

use App\Domain\Points\Points;
use App\Domain\Member\Member;
use App\Domain\Schoolyear\Schoolyear;
use App\Domain\Points\PointsRepository;
use App\Domain\Attendance\AttendanceRepository;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\CannotCreateDomainRecordException;
use App\Domain\DomainException\WrongParameterException;
use Respect\Validation\Validator as V;
use Illuminate\Database\Capsule\Manager as DB;

class InMemoryPointsRepository implements PointsRepository
{
    private $points;

    public function __construct(array $points = null) {
        $this->points = Points::all();
    }

    public function findAll() : object {
        return $this->points;
    }

    public function getById(int $id) : Points
    {
        $points = Points::find($id);

        if ($points == null) {
            throw new DomainRecordNotFoundException();
        }

        return $points;
    }

    public function create(object $data): int
    {
        $valid = V::intVal()->validate($data->points);
        $valid = $valid && V::intVal()->validate($data->member_id);
        $valid = $valid && V::intVal()->validate($data->reason_id);

        if ($valid) {
            $points = new Points();
            $points->points = $data->points;
            $points->member_id = $data->member_id;
            $points->reason_id = $data->reason_id;

            $points->save();
            return $points->id;
        }
        throw new CannotCreateDomainRecordException();
    }

    public function createBulk(array $data): int {
        foreach ($data as $points) {
            $this->create($points);
        }
        return 1;
    }

    public function update(int $id, object $data) {
        $points = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if ($points->points != $data->points) {
            if (!V::intVal()->validate($data->points)) {
                throw new CannotCreateDomainRecordException();
            }

            $points->points = $data->points;
            $update = true;
        }

        if ($points->member_id != $data->member_id) {
            if (!V::intVal()->validate($data->member_id)) {
                throw new CannotCreateDomainRecordException();
            }

            $points->member_id = $data->member_id;
            $update = true;
        }

        if ($points->reason != $data->reason) {
            if (!V::intVal()->validate($data->reason)) {
                throw new CannotCreateDomainRecordException();
            }

            $points->reason = $data->reason;
            $update = true;
        }

        if ($update) {
            $points->save();
        }

        return $points;
    }

    public function getByMember($memberId) {
        
        if (!V::intVal()->validate($memberId)) {
            throw new WrongParameterException();
        }

        return Points::join("reason", "points.reason_id", "=", "reason.id")
            ->select("points.points", "points.created_at", "reason.name")
            ->where("points.member_id", $memberId)
            ->get();
    }

    public function getSumByMember($memberId) {
        if (!V::intVal()->validate($memberId)) {
            throw new WrongParameterException();
        }

        return Points::
            join("member", "points.member_id", "=", "member.id")
            ->select(
                "member_id",
                "member.name",
                "member.surname",
                DB::raw("SUM(points) as sum_points")
            )->groupBy("member_id")
            ->where("member_id", $memberId)
            ->get()
            ;
    }

    /**
     * Return all members with points sum, no schoolyear restrictions.
     */
    public function getSumForAllMembers() {
        $result = Points::
            join("member", "points.member_id", "=", "member.id")
            ->select(
                "member_id",
                "member.name",
                "member.surname",
                DB::raw("SUM(points) as sum_points")
            )
            ->groupBy("member_id")
            ->orderBy("sum_points", "desc")
            ->get();

        foreach ($result as $r) {
            $member = Member::find($r->member_id);
            $r["sum_attendance"] = intval($member->attendance()->count()/2);
        }

        return $result;        
    }

    /**
     * Return members of given schoolyear and their points sum during selected schoolyear.
     */
    public function getSumForAllMembersBySchoolyear($schoolyearId) {
        $schoolyear = Schoolyear::find($schoolyearId);

        $result = Points::
        join("member", "points.member_id", "=", "member.id")
        ->join("member_schoolyear", "member_schoolyear.member_id", "=", "member.id")
        ->select(
            "points.member_id",
            "member.name",
            "member.surname",
            DB::raw("SUM(points) as sum_points")
        )
        ->where("member_schoolyear.schoolyear_id", $schoolyearId)
        ->where("points.created_at", ">=", strtotime($schoolyear->startDate))
        ->where("points.created_at", "<=", strtotime($schoolyear->endDate))
        ->groupBy("member_id")
        ->orderBy("sum_points", "desc")
        ->get();

        foreach ($result as $r) {
            $member = Member::find($r->member_id);
            $r["sum_attendance"] = intval($member->attendanceBySchoolyear($schoolyear->startDate, $schoolyear->endDate)->count()/2);
            $r["sum_event_attendance"] = intval($member->eventAttendanceBySchoolyear($schoolyear->startDate, $schoolyear->endDate)->count() * 3);
        }

        return $result;
    }

    /**
     * Return Overall (all years included) Sum for members of the given schoolyear.
     */
    public function getOverallSumForAllMembersBySchoolyear($schoolyearId) {
        $schoolyear = Schoolyear::find($schoolyearId);
        $result =  Points::
        join("member", "points.member_id", "=", "member.id")
        ->join("member_schoolyear", "member_schoolyear.member_id", "=", "member.id")
        ->select(
            "points.member_id",
            "member.name",
            "member.surname",
            DB::raw("SUM(points) as sum_points")
        )
        ->where("member_schoolyear.schoolyear_id", $schoolyearId)
        ->groupBy("member_id")
        ->orderBy("sum_points", "desc")
        ->get();

        foreach ($result as $r) {
            $member = Member::find($r->member_id);
            $r["sum_attendance"] = intval($member->attendance()->count()/2);
        }

        return $result;
    }

    public function getSumForAllMembersByRole($role) {
        return Points::
            join("member", "points.member_id", "=", "member.id")
            ->join("member_schoolyear", "member_schoolyear.member_id", "=", "member.id")
            ->select(
                "member_id",
                "member.name",
                "member.surname",
                DB::raw("SUM(points) as sum_points")
            )
            ->where("member.role", $role)
            ->groupBy("member_id")
            ->orderBy("sum_points", "desc")
            ->get();
    }

    /**
     * Return sum for all children of the given schoolyear.
     */
    public function getPublicSum($schoolyearId) {
        $schoolyear = Schoolyear::find($schoolyearId);
        $result = Points::
        join("member", "points.member_id", "=", "member.id")
        ->join("member_schoolyear", "member_schoolyear.member_id", "=", "member.id")
        ->select(
            "points.member_id",
            "member.name",
            "member.surname",
            DB::raw("SUM(points) as sum_points"),
            DB::raw("SUM(CASE WHEN `points`.`created_at` >= ".strtotime($schoolyear->startDate)." AND points.created_at <= ".strtotime($schoolyear->endDate)." THEN points END) as sum_points_schoolyear")
        )
        ->where("member.role", 'D')
        ->where("member_schoolyear.schoolyear_id", $schoolyearId)
        ->groupBy("member_id")
        ->orderBy("sum_points", "desc")
        ->get();

        foreach ($result as $r) {
            $member = Member::find($r->member_id);
            $r["sum_attendance"] = intval($member->attendance()->count()/2);
            $r["sum_attendance_schoolyear"] = intval($member->attendanceBySchoolyear($schoolyear->startDate, $schoolyear->endDate)->count()/2);
        }

        return $result;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }
        return Points::destroy($id);
    }
}