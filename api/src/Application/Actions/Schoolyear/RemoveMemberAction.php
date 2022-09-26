<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class RemoveMemberAction extends SchoolyearAction
{
	
	protected function action(): Response
	{
		$schoolyearId = (int) $this->resolveArg('id');
		$data = json_decode($this->request->getBody()->getContents());
		$this->logger->info("Remove the Member from schoolyear '".$schoolyearId."', member: ".var_export($data->memberId, true));

		$data = $this->schoolyearRepository->removeMember($schoolyearId, $data->memberId);

		return $this->respondWithData($data);
	}
}