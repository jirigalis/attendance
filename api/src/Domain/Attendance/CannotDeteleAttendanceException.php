<?php
declare(strict_types=1);

namespace App\Domain\Member;

use App\Domain\DomainException\DomainException;

class CannotDeleteAttendanceException extends DomainException
{
    public $message = 'The attendance cannot be deleted. The parameters are not valid';

}
