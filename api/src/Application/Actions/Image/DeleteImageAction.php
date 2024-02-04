<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteImageAction extends ImageAction
{
    
    protected function action(): Response
    {
        $imageId = $this->resolveArg("id");
        $this->logger->info("Delete image of id `$imageId`.");        
        $data = $this->imageRepository->delete((int) $imageId);
        
        return $this->respondWithData($data);
    }
}