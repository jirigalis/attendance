<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class SetMembersAction extends SchoolyearAction
{
	
	protected function action(): Response
	{
		$schoolyearId = (int) $this->resolveArg('id');
		$data = json_decode($this->request->getBody()->getContents());
		$this->logger->info("Set Members for schoolyear '".$schoolyearId."', member: ".var_export($data->memberIds, true));

		$data = $this->schoolyearRepository->setMembers($schoolyearId, $data->memberIds);

		return $this->respondWithData($data);
	}
}