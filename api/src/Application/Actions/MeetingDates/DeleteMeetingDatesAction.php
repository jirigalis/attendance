<?php
declare(strict_types=1);

namespace App\Application\Actions\MeetingDates;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteMeetingDatesAction extends MeetingDatesAction
{
	
	protected function action(): Response
	{
        $meetingDatesId = $this->resolveArg("id");

		$this->logger->info("Delete meetingDates of id `$meetingDatesId`.");
		
		$data = $this->meetingDatesRepository->delete((int) $meetingDatesId);
		
		return $this->respondWithData($data);
	}
}