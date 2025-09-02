<?php
declare(strict_types=1);

namespace App\Domain\RemoteScreen;

interface RemoteScreenRepository {
    public function getUpdates(int $userId);

    public function update(int $userId, $data);
}