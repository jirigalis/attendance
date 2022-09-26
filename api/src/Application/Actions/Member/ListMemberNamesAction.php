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
        $schoolyearId = (int) $this->resolveArg("schoolyearId");
        $this->logger->info("Members names list for schoolyear $schoolyearId was viewed.");        
        $members = $this->memberRepository->listNames($schoolyearId);
        return $this->respondWithData($members);
    }
}
