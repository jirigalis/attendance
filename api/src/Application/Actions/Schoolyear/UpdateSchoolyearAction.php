<?php
declare(strict_types=1);

namespace App\Application\Actions\Schoolyear;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class UpdateSchoolyearAction extends SchoolyearAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $schoolyearId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Schoolyear of id `${schoolyearId}` update to ".var_export($data, true).".");
        $parsedData = json_decode($data);
        $schoolyear = $this->schoolyearRepository->update($schoolyearId, $parsedData);

        return $this->respondWithData($schoolyear);
    }
}
