<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class GetPointsByMemberIdAction extends PointsAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$schoolyearId = null;
		if (isset($this->args["schoolyearId"])) {
			$schoolyearId = (int) $this->resolveArg('schoolyearId');
			$this->logger->info("Get Points for member of id `memberId` and schoolyear `$schoolyearId`");
			$data = $this->pointsRepository->getByMemberAndSchoolyear($memberId, $schoolyearId);
			return $this->respondWithData($data);
		} else {
			$this->logger->info("Get All Points for member of id `memberId`");
			$data = $this->pointsRepository->getByMember($memberId);

		}

		return $this->respondWithData($data);
	}
}