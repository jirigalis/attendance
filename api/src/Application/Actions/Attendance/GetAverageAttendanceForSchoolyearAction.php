<?php
declare(strict_types=1);

namespace App\Application\Actions\Attendance;

use Psr\Http\Message\ResponseInterface as Response;

class GetAverageAttendanceForSchoolyearAction extends AttendanceAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('schoolyearId');
        $this->logger->info("Average Attendance for schoolyear `$schoolyearId` was viewed.");        
        $result = $this->attendanceRepository->getAverageAttendanceForSchoolyear($schoolyearId);        
        return $this->respondWithData($result);
    }
}
