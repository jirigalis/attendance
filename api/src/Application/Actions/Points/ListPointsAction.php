<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;

class ListPointsAction extends PointsAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Points list was viewed.");
        
        $points = $this->pointsRepository->findAll();

        return $this->respondWithData($points);
    }
}
