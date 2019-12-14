<?php
declare(strict_types=1);

namespace App\Application\Actions\User;

use App\Application\Actions\Action;
use App\Domain\User\UserRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class UserAction extends Action {
	protected $userRepository;

	public function __construct(LoggerInterface $logger, UserRepository $userRepository, Capsule $capsule)
	{
		parent::__construct($logger, $capsule);
		$this->userRepository = $userRepository;
	}
}