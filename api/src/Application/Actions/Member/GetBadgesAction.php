<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class GetBadgesAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $memberId = $this->resolveArg('id');        
        $this->logger->info("Get badges of member `${memberId}`.");        
        $badges = $this->memberRepository->getBadges($memberId);

        return $this->respondWithData($badges);
    }
}
