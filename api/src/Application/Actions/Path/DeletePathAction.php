<?php
declare(strict_types=1);

namespace App\Application\Actions\Path;

use Psr\Http\Message\ResponseInterface as Response;

class DeletePathAction extends PathAction
{
    
    protected function action(): Response
    {
        $pathId = $this->resolveArg("id");
        $this->logger->info("Delete path of id `$pathId`.");        
        $data = $this->pathRepository->delete((int) $pathId);
        
        return $this->respondWithData($data);
    }
}