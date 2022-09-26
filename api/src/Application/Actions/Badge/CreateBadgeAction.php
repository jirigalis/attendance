<?php
declare(strict_types=1);

namespace App\Application\Actions\Badge;

use Psr\Http\Message\ResponseInterface as Response;

class CreateBadgeAction extends BadgeAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Creating a new badge: ".var_dump($data));
		$badgeId = $this->badgeRepository->create($data);

		return $this->respondWithData($badgeId);
	}
}