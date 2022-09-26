<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use App\Application\Actions\Action;
use App\Domain\Schoolyear\SchoolyearRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class SchoolyearAction extends Action
{
    /**
     * @var SchoolyearRepository
     */
    protected $schoolyearRepository;

    /**
     * @param LoggerInterface $logger
     * @param SchoolyearRepository  $schoolyearRepository
     */
    public function __construct(LoggerInterface $logger, SchoolyearRepository $schoolyearRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->schoolyearRepository = $schoolyearRepository;        
    }
}
