<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class ListMembersAddressesAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Members stats was viewed.");
        
        $members = $this->memberRepository->getMembersAddresses();

        return $this->respondWithData($members);
    }
}
