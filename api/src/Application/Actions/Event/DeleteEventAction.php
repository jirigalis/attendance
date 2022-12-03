<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteEventAction extends EventAction
{
	
	protected function action(): Response
	{
        $eventId = $this->resolveArg("id");
		$this->logger->info("Delete event of id `${eventId}`.");		
		$data = $this->eventRepository->delete((int) $eventId);		
		return $this->respondWithData($data);
	}
}