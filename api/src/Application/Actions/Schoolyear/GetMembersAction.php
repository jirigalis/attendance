<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;

class GetMembersAction extends SchoolyearAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('id');        
        $this->logger->info("Get members of schoolyear `$schoolyearId`.");        
        $badges = $this->schoolyearRepository->getMembers($schoolyearId);

        return $this->respondWithData($badges);
    }
}
