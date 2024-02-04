<?php
declare(strict_types=1);

namespace App\Application\Actions\Category;

use Psr\Http\Message\ResponseInterface as Response;

class GetAllCategoriesAction extends CategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $this->logger->info("Categories list was viewed.");
        
        $categories = $this->categoryRepository->getAll();

        return $this->respondWithData($categories);
    }
}