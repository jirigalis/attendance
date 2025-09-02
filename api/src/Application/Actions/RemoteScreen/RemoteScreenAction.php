<?php
declare(strict_types=1);

namespace App\Application\Actions\RemoteScreen;

use App\Application\Actions\Action;
use App\Domain\RemoteScreen\RemoteScreenRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class RemoteScreenAction extends Action
{
    /**
     * @var \App\Domain\RemoteScreen\RemoteScreenRepository
     */
    protected $remoteScreenRepository;

    /**
     * @param \Psr\Log\LoggerInterface $logger
     * @param \App\Domain\RemoteScreen\RemoteScreenRepository  $remoteScreenRepository
     */
    public function __construct(LoggerInterface $logger, RemoteScreenRepository $remoteScreenRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->remoteScreenRepository = $remoteScreenRepository;
    }
}