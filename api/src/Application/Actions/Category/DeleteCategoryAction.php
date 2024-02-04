<?php
declare(strict_types=1);

namespace App\Application\Actions\Category;

use Psr\Http\Message\ResponseInterface as Response;

class DeleteCategoryAction extends CategoryAction
{
    
    protected function action(): Response
    {
        $categoryId = $this->resolveArg("id");
        $this->logger->info("Delete category of id `$categoryId`.");        
        $data = $this->categoryRepository->delete((int) $categoryId);
        
        return $this->respondWithData($data);
    }
}