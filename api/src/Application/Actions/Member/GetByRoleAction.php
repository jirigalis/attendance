<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class GetByRoleAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $role = $this->resolveArg('role');        
        $this->logger->info("Members of role `${role}` were viewed.");        
        $members = $this->memberRepository->getByRole($role);

        return $this->respondWithData($members);
    }
}
