<?php
declare(strict_types=1);

namespace App\Application\Actions\Badge;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UpdateBadgeAction extends BadgeAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $badgeId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $badge = $this->badgeRepository->update($badgeId, json_decode($data));


        $this->logger->info("Badge of id `${badgeId}` was updated to ".var_export($data, true).".");

        return $this->respondWithData($badge);
    }
}
