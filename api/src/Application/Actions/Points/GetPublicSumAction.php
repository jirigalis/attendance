<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class GetPublicSumAction extends PointsAction
{
	
	protected function action(): Response
	{		
        $schoolyearId = (int) $this->resolveArg("schoolyearId");
        $this->logger->info("Get public Sum Points for all members.");
        $data = $this->pointsRepository->getPublicSum($schoolyearId);
		return $this->respondWithData($data);
	}
}