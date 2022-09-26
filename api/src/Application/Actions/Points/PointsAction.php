<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use App\Application\Actions\Action;
use App\Domain\Points\PointsRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class PointsAction extends Action
{
    /**
     * @var PointsRepository
     */
    protected $pointsRepository;

    /**
     * @param LoggerInterface $logger
     * @param PointsRepository  $pointsRepository
     */
    public function __construct(LoggerInterface $logger, PointsRepository $pointsRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->pointsRepository = $pointsRepository;        
    }
}
