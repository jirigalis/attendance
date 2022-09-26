<?php
declare(strict_types=1);

namespace App\Application\Actions\Badge;

use App\Application\Actions\Action;
use App\Domain\Badge\BadgeRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class BadgeAction extends Action
{
    /**
     * @var BadgeRepository
     */
    protected $badgeRepository;

    /**
     * @param LoggerInterface $logger
     * @param BadgeRepository  $badgeRepository
     */
    public function __construct(LoggerInterface $logger, BadgeRepository $badgeRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->badgeRepository = $badgeRepository;        
    }
}
