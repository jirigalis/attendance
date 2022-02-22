<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class CreatePointsBulkAction extends PointsAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Add bulk points for members: " . $this->request->getBody()->getContents() );
		$pointsId = $this->pointsRepository->createBulk($data);

		return $this->respondWithData($pointsId);
	}
}