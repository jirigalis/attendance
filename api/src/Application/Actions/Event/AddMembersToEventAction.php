<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class AddMembersToEventAction extends EventAction
{
	
	protected function action(): Response
	{
		$eventId = (int) $this->resolveArg('id');
		$data = $this->request->getBody()->getContents();
		$this->logger->info("Add members to event '".$eventId . ", members. " . var_export($data, true));
        $members = json_decode($data);
		$res = $this->eventRepository->addMembers($eventId, $members->members);

		return $this->respondWithData($res);
	}
}