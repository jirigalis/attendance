<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class ListMemberNamesAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Members names list was viewed.");
        
        $members = $this->memberRepository->listNames();

        return $this->respondWithData($members);
    }
}
