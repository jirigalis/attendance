<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Member;

use App\Domain\Member\Member;
use App\Domain\Attendance\Attendance;
use App\Domain\Member\MemberNotFoundException;
use App\Domain\Member\CannotCreateMemberException;
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

    /**
     * {@inheritdoc}
     */
    public function getById(int $id): Member
    {
        $index = array_search($id, array_column($this->members, 'id'));

        if ($index === false) {
            throw new MemberNotFoundException();
        }

        return Member::find($id);
    }


    public function create(object $data): int {
        $valid = V::alpha()->validate($data->name);
        $valid = $valid && V::alpha()->validate($data->surname);
        $valid = $valid && V::alnum("- ,")->validate($data->address);
        $valid = $valid && V::digit("/")->validate($data->rc);        

        if ($valid) {
            $member = new Member;
            $member->name = htmlspecialchars($data->name);
            $member->surname = htmlspecialchars($data->surname);
            $member->rc = htmlspecialchars($data->rc);
            $member->address = htmlspecialchars($data->address);
            $member->contact = htmlspecialchars($data->contact);

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
            if (!V::alpha()->validate($data->name)) {
                throw new CannotCreateMemberException("name");
            }

            $member->name = htmlspecialchars($data->name);
            $update = true;
        }

        if (isset($data->surname) && $member->surname != $data->surname) {
            if (!V::alpha()->validate($data->surname)) {
                throw new CannotCreateMemberException("surname");
            }

            $member->surname = htmlspecialchars($data->surname);
            $update = true;
        }

        if (isset($data->address) && $member->address != $data->address) {
            if (!V::alnum("- ,")->validate($data->address)) {
                throw new CannotCreateMemberException("address");
            }
            
            $member->address = htmlspecialchars($data->address);
            $update = true;
        }

        if (isset($data->rc) && $member->rc != $data->rc) {
            if (!V::digit("/")->validate($data->rc)) {
                throw new CannotCreateMemberException("rc");
            }
            
            $member->rc = htmlspecialchars($data->rc);
            $update = true;
        }

        if (isset($data->contact) && $member->contact != $data->contact) {            
            $member->contact = htmlspecialchars($data->contact);
            $update = true;
        }

        if ($update) {
            $member->save();
        }

        return $member;
    }

    public function getAttendance(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new MemberNotFoundException();
        }

        $member = Member::find($id)->attendance;

        return $member;
    }

    public function addAttendance(int $id, string $timestamp) {
        if (!V::intVal()->validate($id)) {
            throw new MemberNotFoundException();
        }

        $member = Member::find($id);
        $attendance = new Attendance(["date" => gmdate("Y-m-d H:i:s", (int) $timestamp)]);        

        return $member->attendance()->save($attendance);;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new MemberNotFoundException();
        }
        
        $res =  Member::destroy($id);
        if ($res) {
            $res = $res && Attendance::destroy($id);
        }
        return $res;
    }
}
