<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class GetPointsByMemberIdAction extends PointsAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');

		$this->logger->info("Get Points for member of id `${memberId}`");

		$data = $this->pointsRepository->getByMember($memberId);

		return $this->respondWithData($data);
	}
}