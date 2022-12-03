<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class CreateEventAction extends EventAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Creating a new event: ".var_dump($data));
		$eventId = $this->eventRepository->create($data);

		return $this->respondWithData($eventId);
	}
}