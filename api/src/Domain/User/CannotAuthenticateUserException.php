<?php
declare(strict_types=1);

namespace App\Domain\User;

use App\Domain\DomainException\DomainException;

class CannotAuthenticateUserException extends DomainException
{
    public $message = 'The authentication has failed. Check your credentials.';

    protected $statusCode = 401;

}
  