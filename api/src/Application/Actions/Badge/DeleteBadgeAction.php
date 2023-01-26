<?php
declare(strict_types=1);

namespace App\Application\Actions\Badge;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteBadgeAction extends BadgeAction
{
	
	protected function action(): Response
	{
        $badgeId = $this->resolveArg("id");

		$this->logger->info("Delete badge of id `$badgeId`.");
		
		$data = $this->badgeRepository->delete((int) $badgeId);
		
		return $this->respondWithData($data);
	}
}