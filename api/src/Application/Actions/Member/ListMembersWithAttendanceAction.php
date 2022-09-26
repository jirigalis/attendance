<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class ListMembersWithAttendanceAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('schoolyearId');
        $members = $this->memberRepository->getBySchoolyear($schoolyearId);
        $this->logger->info("Members list with Attendance was viewed for schoolyear $schoolyearId.");        
        foreach( $members as $m ) {
            $m->attendance = $this->memberRepository->getAttendance($m->id, $schoolyearId);
        }
        return $this->respondWithData($members);
    }
}
