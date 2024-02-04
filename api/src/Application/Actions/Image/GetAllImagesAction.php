<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class GetAllImagesAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Images list was viewed.");
        
        $images = $this->imageRepository->getAll();

        return $this->respondWithData($images);
    }
}