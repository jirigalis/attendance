<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteMemberAction extends MemberAction
{
	
	protected function action(): Response
	{
        $memberId = $this->resolveArg("id");

		$this->logger->info("Delete member of id `$memberId`.");
		
		$data = $this->memberRepository->delete((int) $memberId);
		
		return $this->respondWithData($data);
	}
}