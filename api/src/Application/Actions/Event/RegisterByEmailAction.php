<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class RegisterByEmailAction extends EventAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Register to event by email: ".var_dump($data));
		$res = $this->eventRepository->registerByEmail($data->eventId, $data->childName, $data->token);

		return $this->respondWithData($res);
	}
}