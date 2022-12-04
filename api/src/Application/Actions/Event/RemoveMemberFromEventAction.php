<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class RemoveMemberFromEventAction extends EventAction
{
	
	protected function action(): Response
	{
		$eventId = (int) $this->resolveArg('id');
		$data = $this->request->getBody()->getContents();
		$this->logger->info("Remove member from event '".$eventId . ", member. " . var_export($data, true));
        $member = json_decode($data);
		$res = $this->eventRepository->removeMember($eventId, $member->id);

		return $this->respondWithData($res);
	}
}