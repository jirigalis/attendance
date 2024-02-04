<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class GetImageByIdAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $imageId = (int) $this->resolveArg('id');        
        $this->logger->info("Image of id `$imageId` was viewed.");        
        $image = $this->imageRepository->getById($imageId);
        return $this->respondWithData($image);
    }
}
