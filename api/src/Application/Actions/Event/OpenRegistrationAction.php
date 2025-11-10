<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class OpenRegistrationAction extends EventAction {
	protected function action(): Response{
		$eventId = (int) $this->resolveArg('id');

		$this->logger->info("Open event for registration: ".var_dump($eventId));
		$eventId = $this->eventRepository->openRegistration($eventId);

		return $this->respondWithData($eventId);
	}
}