<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class GetMemberAttendanceAction extends MemberAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$this->logger->info("Get Attendance for member of id `${memberId}`");
		$data = $this->memberRepository->getAttendance($memberId);
		return $this->respondWithData($data);
	}
}