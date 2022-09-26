<?php
declare(strict_types=1);

namespace App\Application\Actions\Reason;

use Psr\Http\Message\ResponseInterface as Response;

class CreateReasonAction extends ReasonAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Creating a new reason: ".var_dump($data));
		$reasonId = $this->reasonRepository->create($data);

		return $this->respondWithData($reasonId);
	}
}