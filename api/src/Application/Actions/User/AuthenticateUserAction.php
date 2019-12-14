<?php
declare(strict_types=1);

namespace App\Application\Actions\User;

use Psr\Http\Message\ResponseInterface as Response;
use App\Domain\User\CannotAuthenticateUserException;
use App\Application\Actions\ActionPayload;
use App\Application\Actions\ActionError;

class AuthenticateUserAction extends UserAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = json_decode($this->request->getBody()->getContents());
        
        $this->logger->info("Authenticate user: ".var_export($data, true));
        
        try {
            $user = $this->userRepository->authenticate($data->username, $data->password);
        } catch (CannotAuthenticateUserException $e) {
            return $this->respondWithError($e);
        }

        return $this->respondWithData($user);
    }
}
