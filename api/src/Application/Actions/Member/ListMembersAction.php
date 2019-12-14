<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class ListMembersAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Members list was viewed.");
        
        $members = $this->memberRepository->findAll();

        return $this->respondWithData($members);
    }
}
