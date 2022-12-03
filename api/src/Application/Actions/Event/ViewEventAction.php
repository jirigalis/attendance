<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class ViewEventAction extends EventAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $eventId = (int) $this->resolveArg('id');        
        $this->logger->info("Event of id `${eventId}` was viewed.");        
        $event = $this->eventRepository->getById($eventId);
        return $this->respondWithData($event);
    }
}
