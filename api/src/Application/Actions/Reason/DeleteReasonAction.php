<?php
declare(strict_types=1);

namespace App\Application\Actions\Reason;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteReasonAction extends ReasonAction
{
	
	protected function action(): Response
	{
        $reasonId = $this->resolveArg("id");

		$this->logger->info("Delete reason of id `${reasonId}`.");
		
		$data = $this->reasonRepository->delete((int) $reasonId);
		
		return $this->respondWithData($data);
	}
}