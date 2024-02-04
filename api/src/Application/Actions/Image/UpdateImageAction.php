<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class UpdateImageAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $imageId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $image = $this->imageRepository->update($imageId, json_decode($data));

        $this->logger->info("Image of id `$imageId` was updated to ".var_export($data, true).".");
        return $this->respondWithData($image);
    }
}
