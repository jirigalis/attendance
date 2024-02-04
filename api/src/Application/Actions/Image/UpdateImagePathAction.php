<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class UpdateImagePathAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $imageId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $image = $this->imageRepository->updatePath($imageId, json_decode($data));

        $this->logger->info("Image Path of image `$imageId` was updated to ".var_export($data, true).".");
        return $this->respondWithData($image);
    }
}
