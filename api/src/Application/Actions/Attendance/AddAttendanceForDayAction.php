<?php
declare(strict_types=1);

namespace App\Application\Actions\Attendance;

use Psr\Http\Message\ResponseInterface as Response;

class AddAttendanceForDayAction extends AttendanceAction
{

	protected function action(): Response
	{
		$date = \date("Y-m-d");
		if (isset($this->args["date"])) {
			$date = $this->resolveArg("date");
        }

        $data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Add attendance for date `${date}`, add members: ".var_export($data, true));

		$data = $this->attendanceRepository->addAttendanceForMembers($date, $data);

		return $this->respondWithData($data);
	}
}