<?php
declare(strict_types=1);

use App\Domain\Member\MemberRepository;
use App\Domain\Attendance\AttendanceRepository;
use App\Domain\User\UserRepository;
use App\Domain\Badge\BadgeRepository;
use App\Domain\Points\PointsRepository;
use App\Domain\Reason\ReasonRepository;
use App\Infrastructure\Persistence\Member\InMemoryMemberRepository;
use App\Infrastructure\Persistence\Attendance\InMemoryAttendanceRepository;
use App\Infrastructure\Persistence\User\InMemoryUserRepository;
use App\Infrastructure\Persistence\Badge\InMemoryBadgeRepository;
use App\Infrastructure\Persistence\Points\InMemoryPointsRepository;
use App\Infrastructure\Persistence\Reason\InMemoryReasonRepository;
use DI\ContainerBuilder;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        MemberRepository::class => \DI\autowire(InMemoryMemberRepository::class),
        AttendanceRepository::class => \DI\autowire(InMemoryAttendanceRepository::class),
        UserRepository::class => \DI\autowire(InMemoryUserRepository::class),
        BadgeRepository::class => \DI\autowire(InMemoryBadgeRepository::class),
        PointsRepository::class => \DI\autowire(InMemoryPointsRepository::class),
        ReasonRepository::class => \DI\autowire(InMemoryReasonRepository::class),
    ]);
};
