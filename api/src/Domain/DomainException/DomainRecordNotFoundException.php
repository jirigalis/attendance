<?php
declare(strict_types=1);

namespace App\Domain\DomainException;

class DomainRecordNotFoundException extends DomainException
{
    public $statusCode = 404;
    public $message = 'The record you requested does not exist.';
}
