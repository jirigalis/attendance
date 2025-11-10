<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class VerifyRegistrationTokenAction extends EventAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Verify token for registration: ".var_export($data, true));
		$result = $this->eventRepository->verifyToken($data->token);

		return $this->respondWithData($result);
	}
}