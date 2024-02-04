<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use App\Application\Actions\Action;
use App\Domain\Image\ImageRepository;
use Psr\Log\LoggerInterface;
use Illuminate\Database\Capsule\Manager as Capsule;

abstract class ImageAction extends Action
{
    /**
     * @var \App\Domain\Image\ImageRepository
     */
    protected $imageRepository;

    /**
     * @param LoggerInterface $logger
     * @param ImageRepository  $imageRepository
     */
    public function __construct(LoggerInterface $logger, ImageRepository $imageRepository, Capsule $capsule)
    {
        parent::__construct($logger, $capsule);
        $this->imageRepository = $imageRepository;        
    }
}