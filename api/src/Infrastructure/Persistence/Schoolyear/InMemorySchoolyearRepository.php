<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Schoolyear;

use App\Domain\Schoolyear\Schoolyear;
use App\Domain\Member\Member;
use App\Domain\Schoolyear\SchoolyearRepository;
use App\Domain\DomainException\DomainRecordNotFound;
use App\Domain\Member\MemberNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\Schoolyear\CannotAuthenticateSchoolyearException;
use Illuminate\Database\Capsule\Manager as DB;
use Respect\Validation\Validator as V;
use Firebase\JWT\JWT;

class InMemorySchoolyearRepository implements SchoolyearRepository
{
    /**
     * @var Schoolyear[]
     */
    private $schoolyears;

    /**
     * InMemorySchoolyearRepository constructor.
     *
     * @param object|null $schoolyears
     */
    public function __construct(array $schoolyears = null)
    {
        $this->schoolyears = Schoolyear::all();
    }

    public function findAll() : object {
        return $this->schoolyears;
    }

    /**
     * {@inheritdoc}
     */
    public function getById(int $id): Schoolyear
    {
        $schoolyear = Schoolyear::find($id);
        if ($schoolyear === false) {
            throw new DomainRecordNotFoundException();
        }

        return $schoolyear;
    }

    public function create(object $data): int
    {
        $valid = V::stringVal()->validate($data->label);

        if ($valid) {
            $schoolyear = new Schoolyear();
            $schoolyear->label = $data->label;
            $schoolyear->startDate = date('Y-m-d', strtotime($data->startDate));
            $schoolyear->endDate = date('Y-m-d', strtotime($data->endDate));
            $schoolyear->save();
            return $schoolyear->id;
        }
        throw new InputNotValidException();
    }

    public function update(int $id, object $data)
    {
        $schoolyear = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if ($schoolyear->label != $data->label) {
            if (!V::stringVal()->validate($data->label)) {
                throw new InputNotValidException();
            }

            $schoolyear->label = $data->label;
            $update = true;
        }

        if ($schoolyear->startDate != $data->startDate) {
            $schoolyear->startDate = date('Y-m-d', strtotime($data->startDate));
            $update = true;
        }

        if ($schoolyear->endDate != $data->endDate) {
            $schoolyear->endDate = date('Y-m-d', strtotime($data->endDate));
            $update = true;
        }

        if ($update) {
            $schoolyear->save();
        }

        return $schoolyear;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }
        return Schoolyear::destroy($id);
    }

    public function getMembers(int $schoolyearId) {
        if (!V::intVal()->validate($schoolyearId)) {
            throw new MemberNotFoundException();
        }

        $schoolyear = Schoolyear::find($schoolyearId);
        return $schoolyear->member()->select("id", "name", "surname")->get();
    }

    public function addMember($schoolyearId, $memberId) {
        if (!V::intVal()->validate($memberId)) {
            throw new MemberNotFoundException();
        }

        if (!V::intVal()->validate($schoolyearId)) {
            throw new InputNotValidException();
        }

        $schoolyear = Schoolyear::find($schoolyearId);
        $member = Member::find($memberId);

        return $schoolyear->member()->attach($member);
    }

    public function removeMember($schoolyearId, $memberId) {
        if (!V::intVal()->validate($memberId)) {
            throw new MemberNotFoundException();
        }

        if (!V::intVal()->validate($schoolyearId)) {
            throw new InputNotValidException();
        }

        $schoolyear = Schoolyear::find($schoolyearId);
        $member = Member::find($memberId);

        return $schoolyear->member()->detach($member);
    }

    /**
     * Get Current schoolyear or return the last available in case of summer holiday.
     */
    public function getCurrent() {
        $today = new \DateTimeImmutable();
        $currentYear = date('Y');
        $holidayStart = new \DateTime("$currentYear-07-01");
        $holidayEnd = new \DateTime("$currentYear-08-31");
        if ($today >= $holidayStart && $today <= $holidayEnd) {
            $today = new \DateTimeImmutable("$currentYear-06-20");
        }
        return Schoolyear::where('startDate', '<=', $today)->where('endDate', '>=', $today)->first();
    }
}
