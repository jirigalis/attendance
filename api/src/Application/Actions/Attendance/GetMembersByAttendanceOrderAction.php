<?php
declare(strict_types=1);

namespace App\Application\Actions\Attendance;

use Psr\Http\Message\ResponseInterface as Response;

class GetMembersByAttendanceOrderAction extends AttendanceAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Get bets members by attendance.");        
        $members = $this->attendanceRepository->getMembersByAttendanceOrder();

        return $this->respondWithData($members);
    }
}
