<?php
declare(strict_types=1);

namespace App\Domain\DomainException;

use Exception;

abstract class DomainException extends Exception
{
    public $statusCode = 500;

    public function getStatusCode() {
        return $this->statusCode;
    }
}
