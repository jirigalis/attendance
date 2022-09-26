<?php
namespace App\Infrastructure\CustomValidation\Exceptions;

use Respect\Validation\Exceptions\ValidationException;

final class AlnumCZException extends ValidationException
{
    protected $defaultTemplates = [
        self::MODE_DEFAULT => [
            self::STANDARD => 'Validation failed, invalid character in czech alnum string.',
        ],
        self::MODE_NEGATIVE => [
            self::STANDARD => 'Validation message if the negative of Something is called and fails validation.',
        ],
    ];
}