<?php
declare(strict_types=1);

namespace App\Domain\DomainException;

class CannotCreateDomainRecordException extends DomainException
{
	public $message = "The record cannot be created.";
}
