<?php
declare(strict_types=1);

namespace App\Infrastructure\Persistence\User;

use App\Domain\User\User;
use App\Domain\User\UserRepository;
use App\Domain\DomainException\DomainRecordNotFound;
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
        $index = array_search($id, array_column($this->members, 'id'));

        if ($index === false) {
            throw new DomainRecordNotFoundException();
        }

        return User::find($id);
    }


    public function authenticate(String $name, String $password) {
        if (!V::alnum()->validate($name) || $password == "") {
            throw new CannotAuthenticateUserException();
        }

        $user = User::where('username', $name)->where('password', $password)->first();

        if (is_null($user)) {
            throw new CannotAuthenticateUserException();
        }
        
        $payload = array(
            "iat" => time(),
            "exp" => time() + (3600 * 24 * 7), // 24 h
            "context" =>[
                "user" => [
                    "username" => $user->username,
                    "id" => $user->id
                ]
            ]
        );

        $token = JWT::encode($payload, getenv("JWT_SECRET"));

        return $token;
    }


}
