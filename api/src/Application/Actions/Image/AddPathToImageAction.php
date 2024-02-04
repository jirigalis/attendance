<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class AddPathToImageAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $imageId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Paths ".var_export($data, true)." were added to the image `$imageId`.");
        $image = $this->imageRepository->addPath($imageId, json_decode($data));

        return $this->respondWithData($image);
    }
}