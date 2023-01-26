<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class GetMemberAttendancePointsAction extends MemberAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$this->logger->info("Get Attendance Points for member of id `$memberId`");
		$data = $this->memberRepository->getAttendancePoints($memberId);
		return $this->respondWithData($data);
	}
}