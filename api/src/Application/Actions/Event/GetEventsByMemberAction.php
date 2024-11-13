<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class GetEventsByMemberAction extends EventAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $memberId = (int) $this->resolveArg('memberId');
        $schoolyearId = (int) $this->resolveArg('schoolyearId');
        $this->logger->info("Events of member `$memberId` and schoolyear `$schoolyearId` was viewed.");        
        $events = $this->eventRepository->getByMemberAndSchoolyear($memberId, $schoolyearId);  
        return $this->respondWithData($events);
    }
}