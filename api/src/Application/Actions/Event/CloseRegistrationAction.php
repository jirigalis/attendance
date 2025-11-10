<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class CloseRegistrationAction extends EventAction {
	protected function action(): Response{
		$eventId = (int) $this->resolveArg('id');

		$this->logger->info("Close event for registration: ".var_dump($eventId));
		$eventId = $this->eventRepository->closeRegistration($eventId);

		return $this->respondWithData($eventId);
	}
}