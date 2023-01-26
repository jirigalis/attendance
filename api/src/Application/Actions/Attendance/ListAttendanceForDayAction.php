<?php
declare(strict_types=1);

namespace App\Application\Actions\Attendance;

use Psr\Http\Message\ResponseInterface as Response;

class ListAttendanceForDayAction extends AttendanceAction
{
	
	protected function action(): Response
	{
		$date = \date("Y-m-d");
		if (isset($this->args["date"])) {
			$date = $this->resolveArg("date");
		}

		$this->logger->info("Get all attendance for date `$date`.");
		
		$data = $this->attendanceRepository->getMembersByDate($date);
		
		return $this->respondWithData($data);
	}
}