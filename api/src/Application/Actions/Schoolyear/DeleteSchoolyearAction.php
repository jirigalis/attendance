<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteSchoolyearAction extends SchoolyearAction
{
	
	protected function action(): Response
	{
        $schoolyearId = $this->resolveArg("id");

		$this->logger->info("Delete schoolyear of id `${schoolyearId}`.");
		
		$data = $this->schoolyearRepository->delete((int) $schoolyearId);
		
		return $this->respondWithData($data);
	}
}