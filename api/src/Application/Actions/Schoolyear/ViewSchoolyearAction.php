<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class ViewSchoolyearAction extends SchoolyearAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('id');
        
        $this->logger->info("Schoolyear of id `${schoolyearId}` was viewed.");
        
        $schoolyear = $this->schoolyearRepository->getById($schoolyearId);

        return $this->respondWithData($schoolyear);
    }
}
