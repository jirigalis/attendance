<?php
declare(strict_types=1);

namespace App\Application\Actions\MeetingDates;

use Psr\Http\Message\ResponseInterface as Response;

class UpdateMeetingDateAction extends MeetingDatesAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $meetingDateId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $meetingDate = $this->meetingDatesRepository->update($meetingDateId, json_decode($data));


        $this->logger->info("MeetingDate of id `$meetingDateId` was updated to ".var_export($data, true).".");

        return $this->respondWithData($meetingDate);
    }
}
