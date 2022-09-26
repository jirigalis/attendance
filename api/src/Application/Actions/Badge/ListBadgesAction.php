<?php
declare(strict_types=1);

namespace App\Application\Actions\Badge;

use Psr\Http\Message\ResponseInterface as Response;

class ListBadgesAction extends BadgeAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Badges list was viewed.");
        
        $badges = $this->badgeRepository->findAll();

        return $this->respondWithData($badges);
    }
}
