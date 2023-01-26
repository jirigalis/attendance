<?php
declare(strict_types=1);

namespace App\Application\Actions\Points;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UpdatePointsAction extends PointsAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $pointsId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Points of id `$pointsId` update to ".var_export($data, true).".");
        $points = $this->pointsRepository->update($pointsId, json_decode($data));
        return $this->respondWithData($points);
    }
}
