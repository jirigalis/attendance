<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class ListMembersBySchoolyearAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('schoolyearId');
        $this->logger->info("Members list of schoolyear `${schoolyearId}` was viewed.");        
        $members = $this->memberRepository->getBySchoolyear($schoolyearId);

        return $this->respondWithData($members);
    }
}
