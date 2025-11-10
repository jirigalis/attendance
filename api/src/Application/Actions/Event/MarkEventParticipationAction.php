<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class MarkEventParticipationAction extends EventAction {
	protected function action(): Response{
		$eventId = (int) $this->resolveArg('id');
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Mark Event Participation for event: " . $eventId . ": ".var_dump($data));
		$event = $this->eventRepository->markParticipation($eventId, $data->memberId, $data->participated);

		return $this->respondWithData($event);
	}
}