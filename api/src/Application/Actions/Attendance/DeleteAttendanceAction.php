<?php
declare(strict_types=1);

namespace App\Application\Actions\Attendance;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteAttendanceAction extends AttendanceAction
{
	
	protected function action(): Response
	{
        $params = $this->request->getQueryParams();

		$this->logger->info("Delete attendance of member `".$params["member"]."`, date `".$params["date"]."`.");
		
		$data = $this->attendanceRepository->deleteAttendance($params["member"], $params["date"]);
		
		return $this->respondWithData($data);
	}
}