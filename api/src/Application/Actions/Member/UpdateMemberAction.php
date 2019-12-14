<?php
declare(strict_types=1);

namespace App\Application\Actions\Member;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UpdateMemberAction extends MemberAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $memberId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $member = $this->memberRepository->update($memberId, json_decode($data));


        $this->logger->info("Member of id `${memberId}` was updated to ".var_export($data, true).".");

        return $this->respondWithData($member);
    }
}
