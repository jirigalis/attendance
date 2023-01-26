<?php
declare(strict_types=1);

namespace App\Application\Actions\MeetingDates;

use Psr\Http\Message\ResponseInterface as Response;

class GetMeetingDatesBySchoolyearAction extends MeetingDatesAction
{
	
	protected function action(): Response
	{
		$schoolyearId = (int) $this->resolveArg('schoolyearId');

		$this->logger->info("Get MeetingDates by schoolyear ID `$schoolyearId`");

		$data = $this->meetingDatesRepository->getBySchoolyear($schoolyearId);

		return $this->respondWithData($data);
	}
}