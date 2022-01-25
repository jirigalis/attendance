<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class AddBadgeAction extends MemberAction
{
	
	protected function action(): Response
	{
		$memberId = (int) $this->resolveArg('id');
		$data = json_decode($this->request->getBody()->getContents());
		$this->logger->info("Add a new Badge for member '".$memberId."', badge: ".var_export($data->badge, true));

		$data = $this->memberRepository->addBadge($memberId, $data->badge);

		return $this->respondWithData($data);
	}
}