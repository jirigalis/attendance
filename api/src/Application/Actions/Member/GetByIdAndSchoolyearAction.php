<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class GetByIdAndSchoolyearAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $memberId = (int) $this->resolveArg('memberId');
        $schoolyearId = (int) $this->resolveArg('schoolyearId');        
        $this->logger->info("Member of id `$memberId` and schoolyear `$schoolyearId` was viewed.");        
        $member = $this->memberRepository->getByIdAndSchoolyear($memberId, $schoolyearId);
        return $this->respondWithData($member);
    }
}
