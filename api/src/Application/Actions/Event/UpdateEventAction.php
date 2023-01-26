<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UpdateEventAction extends EventAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $eventId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Event of id `eventId` update to ".var_export($data, true).".");
        $event = $this->eventRepository->update($eventId, json_decode($data));
        return $this->respondWithData($event);
    }
}
