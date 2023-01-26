<?php
declare(strict_types=1);

namespace App\Application\Actions\Reason;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UpdateReasonAction extends ReasonAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $reasonId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Reason of id `$reasonId` update to ".var_export($data, true).".");
        $reason = $this->reasonRepository->update($reasonId, json_decode($data));
        return $this->respondWithData($reason);
    }
}
