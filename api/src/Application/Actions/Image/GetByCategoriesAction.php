<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use Psr\Http\Message\ResponseInterface as Response;

class GetByCategoriesAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->request->getBody()->getContents();       
        $this->logger->info("Images of categories ".var_export($data, true) . " were viewed.");        
        $images = $this->imageRepository->getByCategories(json_decode($data));
        return $this->respondWithData($images);
    }
}
