<?php
declare(strict_types=1);

namespace App\Application\Actions\RemoteScreen;

use Psr\Http\Message\ResponseInterface as Response;

class UpdateRemoteScreenAction extends RemoteScreenAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->request->getBody()->getContents();
        $userId = (int) $this->resolveArg('userId');
        $this->logger->info("Update RemoteScreen for `$userId`, data: " . var_export($data, true));
        $updates = $this->remoteScreenRepository->update($userId, $data);
        return $this->respondWithData($updates);
    }
}