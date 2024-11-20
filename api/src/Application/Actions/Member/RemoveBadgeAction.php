<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class RemoveBadgeAction extends MemberAction
{

	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$badgeId = (int) $this->resolveArg('badgeId');
		$this->logger->info("Remove Badge of member '".$memberId."', badge: ". $badgeId);

		$data = $this->memberRepository->removeBadge($memberId, $badgeId);

		return $this->respondWithData(true);
	}
}