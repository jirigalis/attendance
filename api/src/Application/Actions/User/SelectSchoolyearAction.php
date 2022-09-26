<?php
declare(strict_types=1);

namespace App\Application\Actions\User;

use Psr\Http\Message\ResponseInterface as Response;
use App\Domain\User\CannotAuthenticateUserException;
use App\Application\Actions\ActionPayload;
use App\Application\Actions\ActionError;

class SelectSchoolyearAction extends UserAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = json_decode($this->request->getBody()->getContents());
        $userId = (int) $this->resolveArg('id');
        
        $this->logger->info("Select schoolyear for user `${userId}`: ".var_export($data, true));
        
        $user = $this->userRepository->selectSchoolyear($userId, $data->schoolyear);
        return $this->respondWithData($user);
    }
}
