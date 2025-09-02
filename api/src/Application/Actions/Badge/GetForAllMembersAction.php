<?php
declare(strict_types=1);

namespace App\Application\Actions\Badge;

use Psr\Http\Message\ResponseInterface as Response;

class GetForAllMembersAction extends BadgeAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('schoolyearId');
        $this->logger->info("Get badges for all members of schoolyear `$schoolyearId`.");        
        $badges = $this->badgeRepository->getForAllMembers($schoolyearId);

        return $this->respondWithData($badges);
    }
}
