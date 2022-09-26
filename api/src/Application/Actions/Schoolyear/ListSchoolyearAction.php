<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class ListSchoolyearAction extends SchoolyearAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Schoolyear list was viewed.");
        
        $schoolyear = $this->schoolyearRepository->findAll();

        return $this->respondWithData($schoolyear);
    }
}
