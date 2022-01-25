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
        $this->logger->info("Get badges for all members.");        
        $badges = $this->badgeRepository->getForAllMembers();

        return $this->respondWithData($badges);
    }
}
