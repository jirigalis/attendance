<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class CreatePointsAction extends PointsAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Add points for user: " . $this->request->getBody()->getContents() );
		$pointsId = $this->pointsRepository->create($data);

		return $this->respondWithData($pointsId);
	}
}