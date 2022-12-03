<?php
declare(strict_types=1);

use App\Domain\Member\MemberRepository;
use App\Domain\Attendance\AttendanceRepository;
use App\Domain\User\UserRepository;
use App\Domain\Badge\BadgeRepository;
use App\Domain\Points\PointsRepository;
use App\Domain\Reason\ReasonRepository;
use App\Domain\MeetingDates\MeetingDatesRepository;
use App\Domain\Schoolyear\SchoolyearRepository;
use App\Domain\Event\EventRepository;
use App\Infrastructure\Persistence\Member\InMemoryMemberRepository;
use App\Infrastructure\Persistence\Attendance\InMemoryAttendanceRepository;
use App\Infrastructure\Persistence\User\InMemoryUserRepository;
use App\Infrastructure\Persistence\Badge\InMemoryBadgeRepository;
use App\Infrastructure\Persistence\Points\InMemoryPointsRepository;
use App\Infrastructure\Persistence\Reason\InMemoryReasonRepository;
use App\Infrastructure\Persistence\MeetingDates\InMemoryMeetingDatesRepository;
use App\Infrastructure\Persistence\Schoolyear\InMemorySchoolyearRepository;
use App\Infrastructure\Persistence\Event\InMemoryEventRepository;
use DI\ContainerBuilder;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([
        MemberRepository::class => \DI\autowire(InMemoryMemberRepository::class),
        AttendanceRepository::class => \DI\autowire(InMemoryAttendanceRepository::class),
        UserRepository::class => \DI\autowire(InMemoryUserRepository::class),
        BadgeRepository::class => \DI\autowire(InMemoryBadgeRepository::class),
        PointsRepository::class => \DI\autowire(InMemoryPointsRepository::class),
        ReasonRepository::class => \DI\autowire(InMemoryReasonRepository::class),
        MeetingDatesRepository::class => \DI\autowire(InMemoryMeetingDatesRepository::class),
        EventRepository::class => \DI\autowire(InMemoryEventRepository::class),
        SchoolyearRepository::class => \DI\autowire(InMemorySchoolyearRepository::class),
    ]);
};
