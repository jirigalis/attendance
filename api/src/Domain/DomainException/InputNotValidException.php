<?php
declare(strict_types=1);

namespace App\Domain\DomainException;

class InputNotValidException extends DomainException
{
	public $message = "The record cannot be created, the input is not valid.";
}
