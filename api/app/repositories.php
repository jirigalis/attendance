<?php
declare(strict_types=1);

use App\Domain\Member\MemberRepository;
use App\Domain\Attendance\AttendanceRepository;
use App\Domain\User\UserRepository;
use App\Infrastructure\Persistence\Member\InMemoryMemberRepository;
use App\Infrastructure\Persistence\Attendance\InMemoryAttendanceRepository;
use App\Infrastructure\Persistence\User\InMemoryUserRepository;
use DI\ContainerBuilder;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        MemberRepository::class => \DI\autowire(InMemoryMemberRepository::class),
        AttendanceRepository::class => \DI\autowire(InMemoryAttendanceRepository::class),
        UserRepository::class => \DI\autowire(InMemoryUserRepository::class),
    ]);
};
