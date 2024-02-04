<?php
declare(strict_types=1);

namespace App\Application\Actions\Category;

use Psr\Http\Message\ResponseInterface as Response;

class CreateCategoryAction extends CategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Categories a new category: " . var_export($data, true));        
        $category = $this->categoryRepository->create(json_decode($data));

        return $this->respondWithData($category);
    }
}