<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;

class ExportAttendanceAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('schoolyearId');
        $data = json_decode($this->request->getBody()->getContents());
        $this->logger->info("Export attendance of schoolyear `{$schoolyearId}` for members " . var_export($data, true) ." was called.");        
        $members = $this->memberRepository->exportAttendance($schoolyearId, $data->memberIds);

        return $this->respondWithData($members);
    }
}
