<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class RegisterToEventAction extends EventAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Register to event: ".var_dump($data->eventId));
		$res = $this->eventRepository->registerToEvent($data->eventId, $data->childId, $data->token);

		return $this->respondWithData($res);
	}
}