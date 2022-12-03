<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class ListEventsAction extends EventAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Event list was viewed.");        
        $events = $this->eventRepository->findAll();
        return $this->respondWithData($events);
    }
}
