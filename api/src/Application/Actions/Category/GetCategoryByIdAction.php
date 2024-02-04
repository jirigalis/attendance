<?php
declare(strict_types=1);

namespace App\Application\Actions\Category;

use Psr\Http\Message\ResponseInterface as Response;

class GetCategoryByIdAction extends CategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $categoryId = (int) $this->resolveArg('id');        
        $this->logger->info("Category of id `$categoryId` was viewed.");        
        $category = $this->categoryRepository->getById($categoryId);
        return $this->respondWithData($category);
    }
}
