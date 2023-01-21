<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Member;

use App\Domain\Member\Member;
use App\Domain\Schoolyear\Schoolyear;
use App\Domain\Badge\Badge;
use App\Domain\Attendance\Attendance;
use App\Domain\Member\MemberNotFoundException;
use App\Domain\Member\CannotCreateMemberException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\Member\MemberRepository;
use Illuminate\Database\Capsule\Manager as DB;
use Respect\Validation\Validator as V;

class InMemoryMemberRepository implements MemberRepository
{
    /**
     * @var Member[]
     */
    private $members;

    /**
     * InMemoryMemberRepository constructor.
     *
     * @param object|null $members
     */
    public function __construct(array $members = null)
    {
        $this->members = Member::all();
    }

    /**
     * {@inheritdoc}
     */
    public function findAll(): object
    {
        return $this->members;
    }

    public function listNames($schoolyearId): object {
        return Member::
            join('member_schoolyear', 'member.id', '=', 'member_schoolyear.member_id')
            ->select("id", "name", "surname", "role")
            ->where('member_schoolyear.schoolyear_id', $schoolyearId)
            ->get();
    }

    public function getByRole($role) {
        return Member::where("role", $role)->get();
    }

    /**
     * {@inheritdoc}
     */
    public function getById(int $id): Member
    {
        $member = Member::find($id);
        if ($member == null) {
            throw new MemberNotFoundException();
        }

        return $member;
    }

    public function getByIdAndSchoolyear(int $memberId, int $schoolyearId) {
        return Member::
        join('member_schoolyear', 'member.id', '=', 'member_schoolyear.member_id')
        ->select(
            "member.*",
            "member_schoolyear.application",
            "member_schoolyear.paid",
        )
        ->where('member.id', $memberId)
        ->where('member_schoolyear.schoolyear_id', $schoolyearId)
        ->first();
    }

    public function getBySchoolyear(int $schoolyearId) {
        return Member::
            join('member_schoolyear', 'member.id', '=', 'member_schoolyear.member_id')
            ->select(
                "member.*",
                "member_schoolyear.application",
                "member_schoolyear.paid",
            )
            ->where('member_schoolyear.schoolyear_id', $schoolyearId)
            ->orderby('role')
            ->orderby('name')
            ->get();
    }


    public function create(object $data): int {
        $valid = V::alphaCZ()->validate($data->name);
        $valid = $valid && V::alphaCZ()->validate($data->surname);
        $valid = $valid && V::optional(V::alnum("- ,ěščřžýáíéďťňúůĚŠČŘŽÝÁÍÉĎŤŇÚŮ"))->validate($data->address);
        $valid = $valid && V::optional(V::email())->validate($data->email);
        $valid = $valid && V::optional(V::digit("/"))->validate($data->rc);
        $valid = $valid && V::anyOf(V::equals("D"), V::equals("V"))->validate($data->role);
        $valid = $valid && V::optional(V::alnum("- ,ěščřžýáíéďťňúůĚŠČŘŽÝÁÍÉĎŤŇÚŮ"))->validate($data->requirements);

        if ($valid) {
            $member = new Member;
            $member->name = htmlspecialchars($data->name);
            $member->surname = htmlspecialchars($data->surname);
            $member->rc = htmlspecialchars($data->rc);
            $member->address = htmlspecialchars($data->address);
            $member->email = htmlspecialchars($data->email);
            $member->contact = htmlspecialchars($data->contact);
            if (isset($data->requirements)){
                $member->requirements = htmlspecialchars($data->requirements);
            }

            $member->save();
            return $member->id;
        }
        throw new CannotCreateMemberException();
    }

    public function update(int $id, object $data) {
        $member = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new MemberNotFoundException();
        }


        if (isset($data->name) && $member->name != $data->name) {
            if (!V::alphaCZ()->validate($data->name)) {
                throw new CannotCreateMemberException("name");
            }

            $member->name = htmlspecialchars($data->name);
            $update = true;
        }

        if (isset($data->surname) && $member->surname != $data->surname) {
            if (!V::alphaCZ()->validate($data->surname)) {
                throw new CannotCreateMemberException("surname");
            }

            $member->surname = htmlspecialchars($data->surname);
            $update = true;
        }

        if (isset($data->address) && $member->address != $data->address) {
            if (!V::optional(V::alnum("- ,ěščřžýáíéďťňĚŠČŘŽÝÁÍÉĎŤŇÚŮ"))->validate($data->address)) {
                throw new CannotCreateMemberException("address");
            }

            $member->address = htmlspecialchars($data->address);
            $update = true;
        }

        if (isset($data->email) && $member->email != $data->email) {
            if (!V::optional(V::email())->validate($data->email)) {
                throw new CannotCreateMemberException("email");
            }

            $member->email = htmlspecialchars($data->email);
            $update = true;
        }

        if (isset($data->rc) && $member->rc != $data->rc) {
            if (!V::digit("/")->validate($data->rc)) {
                throw new CannotCreateMemberException("rc");
            }

            $member->rc = htmlspecialchars($data->rc);
            $update = true;
        }

        if (isset($data->role) && $member->role != $data->role) {
            if (!V::anyOf(V::equals("D"), V::equals("V"))->validate($data->role)) {
                throw new CannotCreateMemberException("role");
            }

            $member->role = htmlspecialchars($data->role);
            $update = true;
        }

        if (isset($data->contact) && $member->contact != $data->contact) {
            $member->contact = htmlspecialchars($data->contact);
            $update = true;
        }

        if (isset($data->requirements) && $member->requirements != $data->requirements) {
            $member->requirements = htmlspecialchars($data->requirements);
            $update = true;
        }

        if (isset($data->application) && $data->schoolyearId) {
            $member->schoolyear()->syncWithoutDetaching([$data->schoolyearId => ['application' => $data->application]]);
            $update = true;
        }

        if (isset($data->paid) && $data->schoolyearId) {
            $dateParsed = date('Y-m-d', strtotime($data->paid));
            $member->schoolyear()->syncWithoutDetaching([$data->schoolyearId => ['paid' => $dateParsed]]);
            $update = true;
        }

        if ($update) {
            $member->save();
        }

        return $member;
    }

    public function getAttendance(int $memberId, int $schoolyearId) {
        if (!V::intVal()->validate($memberId)) {
            throw new MemberNotFoundException();
        }

        $schoolyear = Schoolyear::find($schoolyearId);
        $attendance = Member::find($memberId)->attendance;
        $res = [];

        foreach ($attendance as $a ) {
            $date = new \DateTime($a->date);
            $startDate = new \DateTime($schoolyear->startDate);
            $endDate = new \DateTime($schoolyear->endDate);
            if ($date >= $startDate && $date <= $endDate) {
                $res[] = $date->format("d. m. Y");
            }
        }

        return $res;
    }

    public function addAttendance(int $id, string $timestamp) {
        if (!V::intVal()->validate($id)) {
            throw new MemberNotFoundException();
        }

        $member = Member::find($id);
        $attendance = new Attendance(["date" => gmdate("Y-m-d H:i:s", (int) $timestamp)]);

        return $member->attendance()->save($attendance);
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new MemberNotFoundException();
        }

        $res =  Member::destroy($id);
        if ($res) {
            // Attendance::destroy($id);
        }
        return $res;
    }

    public function getMembersAddresses() {
        return array_column($this->members->toArray(), 'address', 'id');
    }

    public function getBadges($memberId) {
        if (!V::intVal()->validate($memberId)) {
            throw new MemberNotFoundException();
        }

        $member = Member::find($memberId);
        return $member->badge()->get();
    }

    public function addBadge($memberId, $badgeId) {
        if (!V::intVal()->validate($memberId)) {
            throw new MemberNotFoundException();
        }

        if (!V::intVal()->validate($badgeId)) {
            throw new InputNotValidException();
        }

        $badge = Badge::find($badgeId);
        $member = Member::find($memberId);
        
        $member->badge()->attach($badge, ["created_at" => (new \DateTime())->getTimestamp()]);

        return true;
    }

    public function exportAttendance(int $schoolyearId, array $members) {
        if (!V::intVal()->validate($schoolyearId)) {
            throw new InputNotValidException();
        }

        $result = [];
        $sy = Schoolyear::find($schoolyearId);

        foreach ($members as $memberId) {
            $m = Member::find($memberId);

            // filter schoolyears
            $memberSchoolyear = null;
            foreach ($m->schoolyear as $y) {
                if ($y->id === $sy->id) {
                    $memberSchoolyear = $y->pivot->paid;
                    break;
                }
            }
            $m->paid = $memberSchoolyear;
            $m->attendance = $m->attendanceBySchoolyear($m->paid, $sy->endDate)->get();
            $result[] = $m;
        };

        return $result;
    }
}
