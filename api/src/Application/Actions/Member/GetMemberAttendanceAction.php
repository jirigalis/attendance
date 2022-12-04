<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class GetMemberAttendanceAction extends MemberAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$schoolyearId = (int) $this->resolveArg('schoolyearId');
		$this->logger->info("Get Attendance for member of id `${memberId}` and schoolyear `${schoolyearId}`");
		$data = $this->memberRepository->getAttendance($memberId, $schoolyearId);
		return $this->respondWithData($data);
	}
}