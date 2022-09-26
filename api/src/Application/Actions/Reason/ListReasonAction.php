<?php
declare(strict_types=1);

namespace App\Application\Actions\Reason;

use Psr\Http\Message\ResponseInterface as Response;

class ListReasonAction extends ReasonAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Reason list was viewed.");
        
        $reason = $this->reasonRepository->findAll();

        return $this->respondWithData($reason);
    }
}
