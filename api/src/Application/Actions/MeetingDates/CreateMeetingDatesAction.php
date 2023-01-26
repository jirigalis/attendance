<?php
declare(strict_types=1);

namespace App\Application\Actions\MeetingDates;

use Psr\Http\Message\ResponseInterface as Response;

class CreateMeetingDatesAction extends MeetingDatesAction {
	protected function action(): Response{
        $data = $this->request->getBody()->getContents();

		$this->logger->info("Creating a new meetingDates: ".var_export($data, true));
		$meetingDatesId = $this->meetingDatesRepository->create(json_decode($data));

		return $this->respondWithData($meetingDatesId);
	}
}