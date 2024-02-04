<?php
declare(strict_types=1);

namespace App\Application\Actions\Category;

use Psr\Http\Message\ResponseInterface as Response;

class UpdateCategoryAction extends CategoryAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $categoryId = (int) $this->resolveArg('id');
        $data = $this->request->getBody()->getContents();
        $this->logger->info("Category of id `$categoryId` was updated to ".var_export($data, true).".");
        $category = $this->categoryRepository->update($categoryId, json_decode($data));

        return $this->respondWithData($category);
    }
}
