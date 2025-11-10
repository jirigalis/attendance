<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;

class GetOpenEventsAction extends EventAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Open Events was viewed.");
        $events = $this->eventRepository->getOpenEvents();
        return $this->respondWithData($events);
    }
}
