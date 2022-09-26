<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\Reason;

use App\Domain\Reason\Reason;
use App\Domain\Reason\ReasonRepository;
use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\DomainException\WrongParameterException;
use Respect\Validation\Validator as V;

class InMemoryReasonRepository implements ReasonRepository
{
    private $reason;

    public function __construct(array $reason = null) {
        $this->reason = Reason::all();
    }

    public function findAll() : object {
        return $this->reason;
    }

    public function getById(int $id) : Reason
    {
        $reason = Reason::find($id);

        if ($reason == null) {
            throw new DomainRecordNotFoundException();
        }

        return $reason;
    }

    public function create(object $data): int
    {
        $valid = V::alnumCZ()->validate($data->name);

        if ($valid) {
            $reason = new Reason();
            $reason->name = $data->name;
            $reason->save();
            return $reason->id;
        }
        throw new InputNotValidException();
    }

    public function update(int $id, object $data)
    {
        $reason = $this->getById($id);
        $update = false;

        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }

        if ($reason->name != $data->name) {
            if (!V::alnumCZ()->validate($data->name)) {
                throw new InputNotValidException();
            }

            $reason->name = $data->name;
            $update = true;
        }

        if ($update) {
            $reason->save();
        }

        return $reason;
    }

    public function delete(int $id) {
        if (!V::intVal()->validate($id)) {
            throw new DomainRecordNotFoundException();
        }
        return Reason::destroy($id);
    }
}