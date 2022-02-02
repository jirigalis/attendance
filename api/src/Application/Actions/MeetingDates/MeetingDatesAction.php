<?php
declare(strict_types=1);

namespace App\Application\Actions\MeetingDates;

use App\Application\Actions\Action;
use App\Domain\MeetingDates\MeetingDatesRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class MeetingDatesAction extends Action
{
    /**
     * @var MeetingDatesRepository
     */
    protected $meetingDatesRepository;

    /**
     * @param LoggerInterface $logger
     * @param MeetingDatesRepository  $meetingDatesRepository
     */
    public function __construct(LoggerInterface $logger, MeetingDatesRepository $meetingDatesRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->meetingDatesRepository = $meetingDatesRepository;        
    }
}
