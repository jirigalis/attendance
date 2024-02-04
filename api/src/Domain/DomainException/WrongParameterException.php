<?php
declare(strict_types=1);

namespace App\Domain\DomainException;

use App\Domain\DomainException\DomainException;

class WrongParameterException extends DomainException
{
    public $message = 'The parameter is not valid';
    public $statusCode = 400;
    public $code = 400;

    public function __constructor(string $param) {
        $this->message = $this->message . ": `$param`"; 
    }

}
