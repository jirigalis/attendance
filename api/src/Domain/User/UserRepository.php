<?php
declare(strict_types=1);

namespace App\Domain\User;

interface UserRepository
{
    /**
     * @return User[]
     */
    // public function findAll(): object;

    /**
     * @param int $id
     * @return User
     * @throws UserNotFoundException
     */
    public function getById(int $id): User;

    public function authenticate(String $name, String $password);

    //public function getByName(string $name): array;

    // public function update(int $id, object $data);

    // public function create(object $data): int;

    // public function delete(int $id);
}
