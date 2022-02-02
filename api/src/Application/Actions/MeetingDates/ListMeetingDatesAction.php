<?php
declare(strict_types=1);

namespace App\Application\Actions\MeetingDates;

use Psr\Http\Message\ResponseInterface as Response;

class ListMeetingDatesAction extends MeetingDatesAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("MeetingDates list was viewed.");
        
        $meetingDates = $this->meetingDatesRepository->findAll();

        return $this->respondWithData($meetingDates);
    }
}
