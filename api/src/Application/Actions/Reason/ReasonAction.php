<?php
declare(strict_types=1);

namespace App\Application\Actions\Reason;

use App\Application\Actions\Action;
use App\Domain\Reason\ReasonRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class ReasonAction extends Action
{
    /**
     * @var ReasonRepository
     */
    protected $reasonRepository;

    /**
     * @param LoggerInterface $logger
     * @param ReasonRepository  $reasonRepository
     */
    public function __construct(LoggerInterface $logger, ReasonRepository $reasonRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->reasonRepository = $reasonRepository;        
    }
}
