<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class AddMemberAction extends SchoolyearAction
{
	
	protected function action(): Response
	{
		$schoolyearId = (int) $this->resolveArg('id');
		$data = json_decode($this->request->getBody()->getContents());
		$this->logger->info("Add a new Member for schoolyear '".$schoolyearId."', member: ".var_export($data->memberId, true));

		$data = $this->schoolyearRepository->addMember($schoolyearId, $data->memberId);

		return $this->respondWithData($data);
	}
}