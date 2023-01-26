<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\MeetingDates;

use App\Domain\MeetingDates\MeetingDates;
use App\Domain\Schoolyear\Schoolyear;
use App\Domain\MeetingDates\MeetingDatesRepository;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use Respect\Validation\Validator as V;

class InMemoryMeetingDatesRepository implements MeetingDatesRepository
{
    private $meetingDates;

    public function __construct(array $meetingDates = null) {
        $this->meetingDates = MeetingDates::all();
    }

    public function findAll() : object {
        return MeetingDates::orderBy("date")->get();
    }

    public function getById(int $id) : MeetingDates
    {
        $meetingDates = MeetingDates::find($id);

        if ($meetingDates == null) {
            throw new DomainRecordNotFoundException();
        }

        return $meetingDates;
    }

    public function getBySchoolyear($schoolyearId) {
        $schoolyear = Schoolyear::find($schoolyearId);
        return MeetingDates::
            where('date', '>=', $schoolyear->startDate)
            ->where('date', '<=', $schoolyear->endDate)
            ->orderBy('date')->get();
    }

    public function create($data): int
    {
        $valid = V::date("Y-m-d")->validate($data->date);

        if ($valid) {
            $meetingDates = new MeetingDates();
            $meetingDates->date = $data->date;
            if (is_null($data->description)) {
                $meetingDates->description = htmlspecialchars($data->description);
            }
            $meetingDates->save();
            return $meetingDates->id;
        }
        throw new InputNotValidException();
    }

    public function update(int $id, $data) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if (!V::date("Y-m-d")->validate($data->date)) {
            throw new InputNotValidException('date');
        }

        $meetingDate = $this->getById(($id));
        $update = false;

        if ($meetingDate->date != $data->date) {
            $meetingDate->date = $data->date;
            $update = true;
        }

        if ($meetingDate->description != $data->description) {
            $meetingDate->description = htmlspecialchars($data->description);
            $update = true;
        }

        if ($update) {
            $meetingDate->save();
        }
        return $meetingDate->id;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }
        return MeetingDates::destroy($id);
    }

    public function getMeetingDatesCountBySchoolyear($schoolyearId) {
        $schoolyear = Schoolyear::find($schoolyearId);
        return MeetingDates::
            where('date', '>=', $schoolyear->startDate)
            ->where('date', '<=', $schoolyear->endDate)
            ->orderBy('date')->count();
    }
}