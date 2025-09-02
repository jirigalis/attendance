<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\RemoteScreen;

use App\Domain\RemoteScreen\RemoteScreen;
use App\Domain\RemoteScreen\RemoteScreenRepository;
use App\Domain\DomainException\DomainRecordNotFoundException;
use Respect\Validation\Validator as V;

class InMemoryRemoteScreenRepository implements RemoteScreenRepository
{
    private $remoteScreens;

    public function __construct()
    {
        $this->remoteScreens = RemoteScreen::all();
    }

    public function getUpdates(int $userId)
    {
        $remoteScreen = RemoteScreen::where('user_id', $userId)->first();
        $remoteScreenCopy = clone $remoteScreen;

        if (is_null($remoteScreen)) {
            throw new DomainRecordNotFoundException();
        }

        if ($remoteScreen->update == 1) {
            $remoteScreenCopy->data = json_decode($remoteScreen->data);
            // $remoteScreen->update = 0;
            $remoteScreen->save();
            return $remoteScreenCopy;
        } else {
            return null; // {};
        }
    }

    public function update(int $userId, $data)
    {
        if (!V::intVal()->validate($userId)) {
            throw new DomainRecordNotFoundException();
        }

        $remoteScreen = $this->remoteScreens->where('user_id', $userId)->first();

        if (is_null($remoteScreen)) {
            throw new DomainRecordNotFoundException();
        }

        $remoteScreen->data = $data;
        $remoteScreen->update = 1;
        $remoteScreen->save();

        return true;
    }
}