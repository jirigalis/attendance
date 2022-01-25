<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class DeletePointsAction extends PointsAction
{
	
	protected function action(): Response
	{
        $pointsId = $this->resolveArg("id");

		$this->logger->info("Delete points of id `${pointsId}`.");
		
		$data = $this->pointsRepository->delete((int) $pointsId);
		
		return $this->respondWithData($data);
	}
}