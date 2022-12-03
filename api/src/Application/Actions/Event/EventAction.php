<?php
declare(strict_types=1);

namespace App\Application\Actions\Event;

use App\Application\Actions\Action;
use App\Domain\Event\EventRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class EventAction extends Action
{
    /**
     * @var EventRepository
     */
    protected $eventRepository;

    /**
     * @param LoggerInterface $logger
     * @param EventRepository  $eventRepository
     */
    public function __construct(LoggerInterface $logger, EventRepository $eventRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->eventRepository = $eventRepository;        
    }
}
