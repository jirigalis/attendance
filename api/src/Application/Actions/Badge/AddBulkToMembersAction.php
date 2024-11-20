<?php
declare(strict_types=1);

namespace App\Application\Actions\Badge;

use Psr\Http\Message\ResponseInterface as Response;

class AddBulkToMembersAction extends BadgeAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Add bulk badge to members: ".var_dump($data));
		$result = $this->badgeRepository->addBulkToMembers($data->badgeId, $data->memberIds, $data->created_at);

		return $this->respondWithData($result);
	}
}