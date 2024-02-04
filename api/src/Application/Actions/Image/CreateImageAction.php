<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class CreateImageAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Categories a new image: " . var_export($data, true));        
        $image = $this->imageRepository->create(json_decode($data));

        return $this->respondWithData($image);
    }
}