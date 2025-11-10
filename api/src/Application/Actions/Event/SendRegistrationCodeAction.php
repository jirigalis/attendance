<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class SendRegistrationCodeAction extends EventAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Send registration code for event to email: " . var_export($data, true));

		$status = null;

		try {
		    $status = $this->eventRepository->sendRegistrationCode($data->email);
		} catch (WrongParameterException $e) {
            return $this->respondWithError(400, "Email se nepodařilo odeslat.");
        }

		return $this->respondWithData($status);
	}
}