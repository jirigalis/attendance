<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class ViewMemberAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $memberId = (int) $this->resolveArg('id');
        
        $this->logger->info("Member of id `${memberId}` was viewed.");
        
        $member = $this->memberRepository->getById($memberId);

        return $this->respondWithData($member);
    }
}
