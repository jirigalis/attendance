<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Badge;

use App\Domain\Badge\Badge;
use App\Domain\Member\Member;
use App\Domain\Badge\BadgeRepository;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\DomainException\CannotCreateDomainRecordException;
use Respect\Validation\Validator as V;

class InMemoryBadgeRepository implements BadgeRepository
{
    private $badges;

    public function __construct(array $badges = null) {
        $this->badges = Badge::all();
    }

    public function findAll() : object {
        return $this->badges;
    }

    public function getById(int $id) : Badge
    {
        $badge = Badge::find($id);

        if ($badge == null) {
            throw new DomainRecordNotFoundException();
        }

        return $badge;
    }

    public function create(object $data): int
    {
        $valid = V::alnumCZ()->validate($data->name);
        $valid = $valid && V::alnum("_-.")->validate($data->logo);

        if ($valid) {
            $badge = new Badge();
            $badge->name = htmlspecialchars($data->name);
            $badge->logo = htmlspecialchars($data->logo);

            $badge->save();
            return $badge->id;
        }
        throw new InputNotValidException();
    }

    public function update(int $id, object $data)
    {
        $badge = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if ($badge->name != $data->name) {
            if (!V::alnumCZ()->validate($data->name)) {
                throw new CannotCreateDomainRecordException();
            }

            $badge->name = htmlspecialchars($data->name);
            $update = true;
        }

        if ($badge->logo != $data->logo) {
            if (!V::alnum("-_.")->validate($data->logo)) {
                throw new CannotCreateDomainRecordException();
            }

            $badge->logo = htmlspecialchars($data->logo);
            $update = true;
        }

        if ($update) {
            $badge->save();
        }

        return $badge;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        $res =  Badge::destroy($id);
        return $res;
    }

    public function getForAllMembers() {
        return Member::has('badge')->with('badge')->get();
    }
}