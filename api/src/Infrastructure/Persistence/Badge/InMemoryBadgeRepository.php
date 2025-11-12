<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Badge;

use App\Domain\Badge\Badge;
use App\Domain\Member\Member;
use App\Domain\Badge\BadgeRepository;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\DomainException\CannotCreateDomainRecordException;
use App\Domain\Schoolyear\Schoolyear;
use Respect\Validation\Validator as V;

class InMemoryBadgeRepository implements BadgeRepository
{
    private $badges;

    public function __construct(?array $badges = null)
    {
        $this->badges = Badge::all();
    }

    public function findAll(): object
    {
        return $this->badges;
    }

    public function getById(int $id): Badge
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
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }
        $badge = $this->getById($id);
        $update = false;

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

    public function delete(int $id)
    {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        $res =  Badge::destroy($id);
        return $res;
    }

    public function getForAllMembers(int $schoolyearId)
    {
        return Member::whereHas('schoolyear', function ($query) use ($schoolyearId) {
            $query->where('schoolyear_id', $schoolyearId);
        })
        ->with('badge') // Eager load the badge relationship
        ->withCount('badge') // Add a badge_count attribute to each member
        ->orderBy('badge_count', 'desc') // Sort by the count of badges, descending
        ->get();
    }

    public function addBulkToMembers(int $badgeId, array $members, string $created_at)
    {
        $badge = $this->getById($badgeId);
        $members = Member::find($members);

        if ($badge == null || $members == null) {
            throw new DomainRecordNotFoundException();
        }

        foreach ($members as $member) {
            $member->badge()->attach($badge, ["created_at" => strtotime($created_at)]);
        }

        return 1;
    }
}