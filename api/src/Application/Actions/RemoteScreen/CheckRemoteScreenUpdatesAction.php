<?php
declare(strict_types=1);

namespace App\Application\Actions\RemoteScreen;

use Psr\Http\Message\ResponseInterface as Response;

class CheckRemoteScreenUpdatesAction extends RemoteScreenAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $userId = (int) $this->resolveArg('userId');
        $updates = $this->remoteScreenRepository->getUpdates($userId);
        return $this->respondWithData($updates);
    }
}