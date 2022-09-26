<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Points;

use App\Domain\Points\Points;
use App\Domain\Points\PointsRepository;
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

    public function getSumForAllMembers() {
        return Points::
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
    }

    public function getSumForAllMembersBySchoolyear($schoolyearId) {
        return Points::
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
    }

    public function getSumForAllMembersByRole($role) {
        return Points::
            join("member", "points.member_id", "=", "member.id")
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

    public function getPublicSum($schoolyearId) {
        return Points::
        join("member", "points.member_id", "=", "member.id")
        ->join("member_schoolyear", "member_schoolyear.member_id", "=", "member.id")
        ->select(
            "points.member_id",
            "member.name",
            "member.surname",
            DB::raw("SUM(points) as sum_points")
        )
        ->where("member.role", 'D')
        ->where("member_schoolyear.schoolyear_id", $schoolyearId)
        ->groupBy("member_id")
        ->orderBy("sum_points", "desc")
        ->get();
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }
        return Points::destroy($id);
    }
}