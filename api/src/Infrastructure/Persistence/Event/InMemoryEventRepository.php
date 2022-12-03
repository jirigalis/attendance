<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Event;

use App\Domain\Event\Event;
use App\Domain\Member\Member;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\DomainException\CannotCreateDomainRecordException;
use App\Domain\Event\EventRepository;
use Respect\Validation\Validator as V;

class InMemoryEventRepository implements EventRepository
{
    private $events;

    public function __construct(array $events = null) {
        $this->events = Event::all();
    }

    public function findAll() : object {
        return $this->events;
    }

    public function getById(int $id) {
        $event = Event::find($id);

        if ($event == null) {
            throw new DomainRecordNotFoundException();
        }

        foreach ($event->members as $m) {
            // $event->members2[] = $m;
        }

        return $event;
    }

    public function create(object $data): int
    {
        $valid = V::alnumCZ()->validate($data->name);

        if ($valid) {
            $event = new Event();
            $event->name = htmlspecialchars($data->name);
            $event->startDate = date('Y-m-d', strtotime($data->startDate));
            $event->endDate = date('Y-m-d', strtotime($data->endDate));
            $event->description = htmlspecialchars($data->description);

            $event->save();
            return $event->id;
        }
        throw new InputNotValidException();
    }

    public function update(int $id, object $data)
    {
        $event = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if ($event->name != $data->name) {
            if (!V::alnumCZ()->validate($data->name)) {
                throw new CannotCreateDomainRecordException();
            }

            $event->name = htmlspecialchars($data->name);
            $update = true;
        }

        if ($event->startDate != $data->startDate) {
            $event->startDate = date('Y-m-d', strtotime($data->startDate));
            $update = true;
        }

        if ($event->endDate != $data->endDate) {
            $event->endDate = date('Y-m-d', strtotime($data->endDate));
            $update = true;
        }

        if ($event->description != $data->description) {
            $event->description = htmlspecialchars($data->description);
            $update = true;
        }

        if ($update) {
            $event->save();
        }

        return $event;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        $res =  Event::destroy($id);
        return $res;
    }

    public function getForAllMembers() {
        return Member::has('event')->with('event')->get();
    }

    public function addMembers(int $eventId, array $members) {
        if (!V::intVal()->validate($eventId)) {
            throw new InputNotValidException('Wrong Event ID');
        }

        $event = Event::find($eventId);
        foreach ($members as $memberId) {
            // ["date" => gmdate("Y-m-d H:i:s", (int) $timestamp)]
            $member = Member::find($memberId);
            $event->members()->save($member);
        }

        return true;
    }
}