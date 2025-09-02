<?php

declare(strict_types=1);

use App\Application\Actions\Member\ListMembersAction;
use App\Application\Actions\Member\ListMemberNamesAction;
use App\Application\Actions\Member\GetByRoleAction;
use App\Application\Actions\Member\ListMembersWithAttendanceAction;
use App\Application\Actions\Member\ListMembersAddressesAction;
use App\Application\Actions\Member\ListMembersBySchoolyearAction;
use App\Application\Actions\Member\ViewMemberAction;
use App\Application\Actions\Member\GetByIdAndSchoolyearAction;
use App\Application\Actions\Member\UpdateMemberAction;
use App\Application\Actions\Member\CreateMemberAction;
use App\Application\Actions\Member\DeleteMemberAction;
use App\Application\Actions\Member\GetMemberAttendanceAction;
use App\Application\Actions\Member\AddMemberAttendanceAction;
use App\Application\Actions\Member\GetBadgesAction;
use App\Application\Actions\Member\AddBadgeAction;
use App\Application\Actions\Member\RemoveBadgeAction;
use App\Application\Actions\Member\ExportAttendanceAction;

use App\Application\Actions\Attendance\ListAttendanceForDayAction;
use App\Application\Actions\Attendance\AddAttendanceForDayAction;
use App\Application\Actions\Attendance\DeleteAttendanceAction;
use App\Application\Actions\Attendance\GetMembersByAttendanceOrderAction;
use App\Application\Actions\Attendance\GetAverageAttendanceForSchoolyearAction;
use App\Application\Actions\Attendance\GetAttendancePointsAction;

use App\Application\Actions\Badge\ListBadgesAction;
use App\Application\Actions\Badge\CreateBadgeAction;
use App\Application\Actions\Badge\DeleteBadgeAction;
use App\Application\Actions\Badge\UpdateBadgeAction;
use App\Application\Actions\Badge\GetForAllMembersAction;
use App\Application\Actions\Badge\AddBulkToMembersAction;

use App\Application\Actions\Points\ListPointsAction;
use App\Application\Actions\Points\CreatePointsAction;
use App\Application\Actions\Points\CreatePointsBulkAction;
use App\Application\Actions\Points\UpdatePointsAction;
use App\Application\Actions\Points\DeletePointsAction;
use App\Application\Actions\Points\GetPointsByMemberIdAction;
use App\Application\Actions\Points\GetPublicSumAction;
use App\Application\Actions\Points\GetSumByMemberAction;
use App\Application\Actions\Points\GetSumForAllMembersAction;

use App\Application\Actions\Reason\ListReasonAction;
use App\Application\Actions\Reason\CreateReasonAction;
use App\Application\Actions\Reason\DeleteReasonAction;
use App\Application\Actions\Reason\UpdateReasonAction;

use App\Application\Actions\MeetingDates\ListMeetingDatesAction;
use App\Application\Actions\MeetingDates\GetMeetingDatesBySchoolyearAction;
use App\Application\Actions\MeetingDates\CreateMeetingDatesAction;
use App\Application\Actions\MeetingDates\UpdateMeetingDateAction;
use App\Application\Actions\MeetingDates\DeleteMeetingDatesAction;

use App\Application\Actions\Schoolyear\ListSchoolyearAction;
use App\Application\Actions\Schoolyear\ViewSchoolyearAction;
use App\Application\Actions\Schoolyear\CreateSchoolyearAction;
use App\Application\Actions\Schoolyear\DeleteSchoolyearAction;
use App\Application\Actions\Schoolyear\UpdateSchoolyearAction;
use App\Application\Actions\Schoolyear\GetMembersAction;
use App\Application\Actions\Schoolyear\AddMemberAction;
use App\Application\Actions\Schoolyear\RemoveMemberAction;
use App\Application\Actions\Schoolyear\GetCurrentSchoolyearAction;

use App\Application\Actions\Event\ListEventsAction;
use App\Application\Actions\Event\CreateEventAction;
use App\Application\Actions\Event\DeleteEventAction;
use App\Application\Actions\Event\UpdateEventAction;
use App\Application\Actions\Event\ViewEventAction;
use App\Application\Actions\Event\AddMembersToEventAction;
use App\Application\Actions\Event\RemoveMemberFromEventAction;
use App\Application\Actions\Event\GetEventsByMemberAction;

use App\Application\Actions\User\AuthenticateUserAction;
use App\Application\Actions\User\SelectSchoolyearAction;

use App\Application\Actions\Category\GetAllCategoriesAction;
use App\Application\Actions\Category\CreateCategoryAction;
use App\Application\Actions\Category\UpdateCategoryAction;
use App\Application\Actions\Category\DeleteCategoryAction;
use App\Application\Actions\Category\GetCategoryByIdAction;


use App\Application\Actions\Image\AddPathToImageAction;
use App\Application\Actions\Image\GetAllImagesAction;
use App\Application\Actions\Image\GetImageByIdAction;
use App\Application\Actions\Image\CreateImageAction;
use App\Application\Actions\Image\UpdateImageAction;
use App\Application\Actions\Image\DeleteImageAction;
use App\Application\Actions\Image\GetByCategoriesAction;
use App\Application\Actions\Image\GetByCategoryAction;
use App\Application\Actions\Image\UpdateImagePathAction;

use App\Application\Actions\Member\GetMemberMeetingDatesAction;

use App\Application\Actions\Path\DeletePathAction;

use App\Application\Actions\RemoteScreen\CheckRemoteScreenUpdatesAction;
use App\Application\Actions\RemoteScreen\UpdateRemoteScreenAction;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Domain\Member\Member;

return function (App $app) {
    $container = $app->getContainer();

    $prefix = getenv("API_PREFIX");

    $app->get($prefix . '/aaa', function (Request $request, Response $response) {
        $test = Member::find(1)->toJson();
        $response->getBody()->write($test);
        return $response;
    });

    $app->group($prefix . '/members', function (Group $group) use ($container) {
        $group->get('', ListMembersAction::class);
        $group->get('/names/schoolyear/{schoolyearId}', ListMemberNamesAction::class);
        $group->get('/addresses', ListMembersAddressesAction::class);
        $group->get('/role/{role}', GetByRoleAction::class);
        $group->get('/{id}', ViewMemberAction::class);
        $group->get('/{id}/attendance/{schoolyearId}', GetMemberAttendanceAction::class);
        $group->post('/{id}/attendance', AddMemberAttendanceAction::class);
        $group->put('/{id}', UpdateMemberAction::class);
        $group->post('/create', CreateMemberAction::class);
        $group->delete('/{id}', DeleteMemberAction::class);
        $group->get('/{id}/badges', GetBadgesAction::class);
        $group->post('/{id}/badges', AddBadgeAction::class);
        $group->delete('/{id}/badges/{badgeId}', RemoveBadgeAction::class);
        $group->get('/{memberId}/schoolyear/{schoolyearId}', GetByIdAndSchoolyearAction::class);
        $group->get('/schoolyear/{schoolyearId}', ListMembersBySchoolyearAction::class);
        $group->get('/schoolyear/{schoolyearId}/attendance', ListMembersWithAttendanceAction::class);
        $group->post('/schoolyear/{schoolyearId}/export-attendance', ExportAttendanceAction::class);
        $group->get('/{id}/meeting-dates/schoolyear/{schoolyearId}', GetMemberMeetingDatesAction::class);
    });

    $app->group($prefix . '/attendance', function (Group $group) use ($container) {
        $group->get('/best-members/{schoolyearId}', GetMembersByAttendanceOrderAction::class);
        $group->get('/average/{schoolyearId}', GetAverageAttendanceForSchoolyearAction::class);
        $group->get('/points/{memberId}[/{schoolyearId}]', GetAttendancePointsAction::class);
        $group->get('[/{date}]', ListAttendanceForDayAction::class);
        $group->post('/{date}', AddAttendanceForDayAction::class);
        $group->delete('', DeleteAttendanceAction::class);
    });

    $app->group($prefix . '/user', function (Group $group) use ($container) {
        $group->post('/authenticate', AuthenticateUserAction::class);
        $group->post('/{id}/select-schoolyear', SelectSchoolyearAction::class);
    });

    $app->group($prefix . '/badges', function (Group $group) use ($container) {
        $group->get('', ListBadgesAction::class);
        $group->post('/create', CreateBadgeAction::class);
        $group->delete('/{id}', DeleteBadgeAction::class);
        $group->put('/{id}', UpdateBadgeAction::class);
        $group->get('/members/{schoolyearId}', GetForAllMembersAction::class);
        $group->post('/add-bulk', AddBulkToMembersAction::class);
    });

    $app->group($prefix . '/points', function (Group $group) use ($container) {
        $group->get('', ListPointsAction::class);
        $group->post('/create', CreatePointsAction::class);
        $group->post('/bulk', CreatePointsBulkAction::class);
        $group->put('/{id}', UpdatePointsAction::class);
        $group->get('/sum[/role/{role}]', GetSumForAllMembersAction::class);
        $group->get('/sum/public/{schoolyearId}', GetPublicSumAction::class);
        $group->get('/sum/schoolyear/{schoolyearId}', GetSumForAllMembersAction::class);
        $group->get('/{memberId}[/{schoolyearId}]', GetPointsByMemberIdAction::class);
        $group->get('/sum/{id}', GetSumByMemberAction::class);
        $group->delete('/{id}', DeletePointsAction::class);
    });

    $app->group($prefix . '/reason', function (Group $group) use ($container) {
        $group->get('', ListReasonAction::class);
        $group->post('/create', CreateReasonAction::class);
        $group->put('/{id}', UpdateReasonAction::class);
        $group->delete('/{id}', DeleteReasonAction::class);
    });

    $app->group($prefix . '/meetingdates', function (Group $group) use ($container) {
        $group->get('', ListMeetingDatesAction::class);
        $group->post('/create', CreateMeetingDatesAction::class);
        $group->put('/{id}', UpdateMeetingDateAction::class);
        $group->get('/{schoolyearId}', GetMeetingDatesBySchoolyearAction::class);
        $group->delete('/{id}', DeleteMeetingDatesAction::class);
    });

    $app->group($prefix . '/schoolyear', function (Group $group) use ($container) {
        $group->get('', ListSchoolyearAction::class);
        $group->post('/create', CreateSchoolyearAction::class);
        $group->get('/current', GetCurrentSchoolyearAction::class);
        $group->get('/{id}', ViewSchoolyearAction::class);
        $group->put('/{id}', UpdateSchoolyearAction::class);
        $group->delete('/{id}', DeleteSchoolyearAction::class);
        $group->get('/{id}/members', GetMembersAction::class);
        $group->post('/{id}/add-member', AddMemberAction::class);
        $group->post('/{id}/remove-member', RemoveMemberAction::class);
    });

    $app->group($prefix . '/event', function (Group $group) use ($container) {
        $group->get('', ListEventsAction::class);
        $group->post('/create', CreateEventAction::class);
        $group->get('/{id}', ViewEventAction::class);
        $group->delete('/{id}', DeleteEventAction::class);
        $group->put('/{id}', UpdateEventAction::class);
        $group->post('/{id}/add-members', AddMembersToEventAction::class);
        $group->post('/{id}/remove-member', RemoveMemberFromEventAction::class);
        $group->get('/member/{memberId}/{schoolyearId}', GetEventsByMemberAction::class);
    });

    $app->group($prefix . '/category', function (Group $group) use ($container) {
        $group->get('', GetAllCategoriesAction::class);
        $group->get('/{id}', GetCategoryByIdAction::class);
        $group->post('/create', CreateCategoryAction::class);
        $group->put('/{id}', UpdateCategoryAction::class);
        $group->delete('/{id}', DeleteCategoryAction::class);
    });

    // Images
    $app->group($prefix . '/image', function (Group $group) use ($container) {
        $group->get('', GetAllImagesAction::class);
        $group->get('/category/{id}', GetByCategoryAction::class);
        $group->get('/{id}', GetImageByIdAction::class);
        $group->post('/create', CreateImageAction::class);
        $group->put('/{id}', UpdateImageAction::class);
        $group->delete('/{id}', DeleteImageAction::class);
        $group->post('/{id}/add-path', AddPathToImageAction::class);
        $group->put('/{id}/update-path', UpdateImagePathAction::class);
        $group->post('/get-by-categories', GetByCategoriesAction::class);
    });

    // Paths
    $app->group($prefix . '/path', function (Group $group) {
        $group->delete('/{id}', DeletePathAction::class);
    });

    // Remote Screen
    $app->group($prefix . '/remote-screen', function (Group $group) use ($container) {
        $group->get('/{userId}/updates', CheckRemoteScreenUpdatesAction::class);
        $group->put('/{userId}/update', UpdateRemoteScreenAction::class);
    });

    $app->get($prefix . '/{test}', function (Request $request, Response $response, $args) {
        $response->getBody()->write('Hello ' . $args["test"]);
        return $response;
    });

    // CORS hack
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });
};