<?php
declare(strict_types=1);

namespace App\Application\Actions\Category;

use App\Application\Actions\Action;
use App\Domain\Category\CategoryRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class CategoryAction extends Action
{
    /**
     * @var \App\Domain\Category\CategoryRepository
     */
    protected $categoryRepository;

    /**
     * @param \Psr\Log\LoggerInterface $logger
     * @param \App\Domain\Category\CategoryRepository  $categoryRepository
     */
    public function __construct(LoggerInterface $logger, CategoryRepository $categoryRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->categoryRepository = $categoryRepository;        
    }
}