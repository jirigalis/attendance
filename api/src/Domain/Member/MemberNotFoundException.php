<?php
declare(strict_types=1);

namespace App\Domain\Member;

use App\Domain\DomainException\DomainRecordNotFoundException;

class MemberNotFoundException extends DomainRecordNotFoundException
{
    public $message = 'The member you requested does not exist.';
}
