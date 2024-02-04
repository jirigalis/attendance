<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class GetByCategoryAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $categoryId = (int) $this->resolveArg('id');        
        $this->logger->info("Images of category id `$categoryId` were viewed.");        
        $images = $this->imageRepository->getByCategory($categoryId);
        return $this->respondWithData($images);
    }
}
