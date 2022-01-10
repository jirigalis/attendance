<?php
namespace App\Infrastructure\CustomValidation\Rules;

use Respect\Validation\Rules\AbstractRule;
use Respect\Validation\Validator as v;

class AlphaCZ extends AbstractRule {
    const CZECH_CHARACTERS = "ěščřžýáíéďťňúůĚŠČŘŽÝÁÍÉĎŤŇÚŮ ";

    public function validate($input): bool {
        return v::alpha(self::CZECH_CHARACTERS)->validate($input);
    }

}