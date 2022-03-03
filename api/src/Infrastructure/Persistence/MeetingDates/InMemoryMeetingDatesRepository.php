<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\MeetingDates;

use App\Domain\MeetingDates\MeetingDates;
use App\Domain\MeetingDates\MeetingDatesRepository;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\DomainException\WrongParameterException;
use Respect\Validation\Validator as V;

class InMemoryMeetingDatesRepository implements MeetingDatesRepository
{
    private $meetingDates;

    public function __construct(array $meetingDates = null) {
        $this->reason = MeetingDates::all();
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

    public function create($data): int
    {
        $valid = V::date("Y-m-d")->validate($data);

        if ($valid) {
            $meetingDates = new MeetingDates();
            $meetingDates->date = $data;
            $meetingDates->save();
            return $meetingDates->id;
        }
        throw new InputNotValidException();
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }
        return MeetingDates::destroy($id);
    }
}