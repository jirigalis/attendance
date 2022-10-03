<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class GetCurrentSchoolyearAction extends SchoolyearAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Get Current Schoolyear action triggered.");        
        $schoolyear = $this->schoolyearRepository->getCurrent();
        return $this->respondWithData($schoolyear);
    }
}
