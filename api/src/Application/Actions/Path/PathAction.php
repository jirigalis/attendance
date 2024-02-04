<?php
declare(strict_types=1);

namespace App\Application\Actions\Path;

use App\Application\Actions\Action;
use App\Domain\Path\PathRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class PathAction extends Action
{
    /**
     * @var \App\Domain\Path\PathRepository
     */
    protected $pathRepository;

    /**
     * @param \Psr\Log\LoggerInterface $logger
     * @param \App\Domain\Path\PathRepository  $pathRepository
     */
    public function __construct(LoggerInterface $logger, PathRepository $pathRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->pathRepository = $pathRepository;        
    }
}