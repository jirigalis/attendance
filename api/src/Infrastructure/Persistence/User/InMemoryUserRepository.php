<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\User;

use App\Domain\User\User;
use App\Domain\Schoolyear\Schoolyear;
use App\Domain\User\UserRepository;
use App\Domain\DomainException\DomainRecordNotFound;
use App\Domain\DomainException\InputNotValidException;
use App\Domain\User\CannotAuthenticateUserException;
use Illuminate\Database\Capsule\Manager as DB;
use Respect\Validation\Validator as V;
use Firebase\JWT\JWT;

class InMemoryUserRepository implements UserRepository
{
    /**
     * @var User[]
     */
    private $users;

    /**
     * InMemoryUserRepository constructor.
     *
     * @param object|null $users
     */
    public function __construct(array $users = null)
    {
        $this->users = User::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getById(int $id): User
    {
        if (!V::intVal()->validate($id)) {
            throw new InputNotValidException();
        }

        return User::find($id);
    }


    public function authenticate(String $name, String $password) {
        if (!V::alnum()->validate($name) || $password == "") {
            throw new CannotAuthenticateUserException();
        }

        $user = User::where('username', $name)->first();

        if (is_null($user) || !\password_verify($password, $user->password)) {
            throw new CannotAuthenticateUserException();
        }

        $payload = array(
            "iat" => time(),
            "exp" => time() + (3600 * 24 * 7), // 24 h
            "context" =>[
                "user" => [
                    "username" => $user->username,
                    "id" => $user->id,
                    "schoolyear" => $user->schoolyear_id
                ]
            ]
        );

        $token = JWT::encode($payload, getenv("JWT_SECRET"));

        return $token;
    }

    public function selectSchoolyear(int $userId, int $schoolyearId) {
        $user = $this->getById($userId);
        
        if (!V::intVal()->validate($schoolyearId)) {
            throw new InputNotValidException();
        }

        $user->schoolyear_id = $schoolyearId;
        return $user->save();
    }


}
