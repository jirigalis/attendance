<?php
declare(strict_types=1);

namespace App\Application\Actions\Attendance;

use App\Application\Actions\Action;
use App\Domain\Attendance\AttendanceRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class AttendanceAction extends Action {
	protected $attendanceRepository;

	public function __construct(LoggerInterface $logger, AttendanceRepository $attendanceRepository, Capsule $capsule)
	{
		parent::__construct($logger, $capsule);
		$this->attendanceRepository = $attendanceRepository;
	}
}