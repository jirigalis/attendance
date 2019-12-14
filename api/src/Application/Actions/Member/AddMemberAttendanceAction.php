<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class AddMemberAttendanceAction extends MemberAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$date = $this->request->getBody()->getContents();
		$this->logger->info("Add a new Attendace for member '".$memberId."': ".var_export($date, true));
		
		$jsonData = json_decode($date);

		$data = $this->memberRepository->addAttendance($memberId, $jsonData->date);

		return $this->respondWithData($data);
	}
}