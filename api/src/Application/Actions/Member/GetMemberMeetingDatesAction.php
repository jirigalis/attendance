<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class GetMemberMeetingDatesAction extends MemberAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$schoolyearId = (int) $this->resolveArg('schoolyearId');
		$this->logger->info("Get Meeting Dates for member of id `$memberId` and schoolyear `$schoolyearId`");
		$data = $this->memberRepository->getMeetingDates($memberId, $schoolyearId);
		return $this->respondWithData($data);
	}
}