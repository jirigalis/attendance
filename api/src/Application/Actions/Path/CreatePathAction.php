<?php
declare(strict_types=1);

namespace App\Application\Actions\Path;

use Psr\Http\Message\ResponseInterface as Response;

class CreatePathAction extends PathAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Categories a new path: " . var_export($data, true));        
        $path = $this->pathRepository->create(json_decode($data));

        return $this->respondWithData($path);
    }
}