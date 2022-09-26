<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class CreateSchoolyearAction extends SchoolyearAction {
	protected function action(): Response{
		$data = json_decode($this->request->getBody()->getContents());

		$this->logger->info("Creating a new schoolyear: ".var_dump($data));
		$schoolyearId = $this->schoolyearRepository->create($data);

		return $this->respondWithData($schoolyearId);
	}
}