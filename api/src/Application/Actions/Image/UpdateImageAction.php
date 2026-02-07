<?php
declare(strict_types=1);

namespace App\Application\Actions\Image;

use App\Domain\DomainException\DomainRecordNotFoundException;
use App\Domain\Path\Path;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\UploadedFileInterface;

class UpdateImageAction extends ImageAction
{
    /**
     * {@inheritdoc}
     */
    protected function action(): Response
    {
        $imageId = (int) $this->resolveArg('id');
        /* $data = $this->request->getBody()->getContents();
        $image = $this->imageRepository->update($imageId, json_decode($data));

        $this->logger->info("Image of id `$imageId` was updated to ".var_export($data, true).".");
        return $this->respondWithData($image); */
        
        $parsedBody = $this->request->getParsedBody();
        $this->logger->info("Image of id `$imageId` was updated to ".var_export($parsedBody, true).".");
        
        $uploadedFiles = $this->request->getUploadedFiles();
        
        $data = (object) [
            'name' => $parsedBody['name'] ?? null,
            'category_id' => isset($parsedBody['category_id']) ? (int) $parsedBody['category_id'] : null,
        ];

        $this->imageRepository->update($imageId, $data);

        $this->logger->info("Uploaded files: ".var_export($uploadedFiles, true));

        // Handle file uploads
        if (!empty($uploadedFiles)) {
            $this->logger->info("Processing uploaded files for image update, number of files: " . count($uploadedFiles));
            foreach ($uploadedFiles as $key => $uploadedFile) {
                $this->logger->info("Processing uploaded file with key: \"$key\"");
                $this->logger->info("Matches", ['matches' => preg_match('/^file_(\d+)$/', $key)]);
                if (preg_match('/^file_(\d+)$/', $key, $matches)) {
                    $pathId = (int) $matches[1];
                    
                    if ($uploadedFile instanceof UploadedFileInterface && $uploadedFile->getError() === UPLOAD_ERR_OK) {
                        // Process the uploaded file
                        $this->handleFileUpload($uploadedFile, $pathId);
                    
                    }
                }
            }
        } else {
            $this->logger->info("No files were uploaded for image update.");
        }

        $updatedImage = $this->imageRepository->getById($imageId);
        return $this->respondWithData($updatedImage);
    }

    private function handleFileUpload(UploadedFileInterface $uploadedFile, int $pathId): void {
        $path = Path::find($pathId);

        if (!$path) {
            throw new DomainRecordNotFoundException();
        }

        $existingFilePath = $path->path;
        $fullFilePath = __DIR__ . '/../../../../../assets/images/' . $existingFilePath;

        $directory = dirname($fullFilePath);

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        if (file_exists($fullFilePath)) {
            unlink($fullFilePath);
        }

        $uploadedFile->moveTo($fullFilePath);

        $path->review = 0;
        $path->save();
    }
}
