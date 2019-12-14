<?php
declare(strict_types=1);

namespace App\Domain\Member;

use App\Domain\DomainException\CannotCreateDomainRecordException;

class CannotCreateMemberException extends CannotCreateDomainRecordException
{
    public $message = 'The member cannot be created. The input is not valid';

    public function __construct($field = null) {
    	if (isset($field)) {
    		$this->message = $this->message . ": " . $field;
    	}
    }
}
