<?php
declare(strict_types=1);

namespace App\Application\Actions\Attendance;

use Psr\Http\Message\ResponseInterface as Response;

class GetAttendancePointsAction extends AttendanceAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $memberId = (int) $this->resolveArg('memberId');
        $schoolyearId = null;
        if (isset($this->args["schoolyearId"])) {
            $schoolyearId = (int) $this->resolveArg('schoolyearId');
            $this->logger->info("Attendance points of member `$memberId` and schoolyear `$schoolyearId`was viewed.");        
            $points = $this->attendanceRepository->getAttendancePointsBySchoolyear($memberId, $schoolyearId);
        } else {
            $this->logger->info("Attendance points of member `$memberId` was viewed.");        
            $points = $this->attendanceRepository->getAttendancePoints($memberId);
        }   
        return $this->respondWithData($points);
    }
}
