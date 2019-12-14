<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class CreateMemberAction extends MemberAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());
		$memberId = $this->memberRepository->create($data);

		$this->logger->info("Creating a new member: ".var_dump($data));

		return $this->respondWithData($memberId);
	}
}