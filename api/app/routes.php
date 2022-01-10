<?php
declare(strict_types=1);

use App\Application\Actions\Member\ListMembersAction;
use App\Application\Actions\Member\ListMemberNamesAction;
use App\Application\Actions\Member\GetByRoleAction;
use App\Application\Actions\Member\ListMembersWithAttendanceAction;
use App\Application\Actions\Member\ListMembersAddressesAction;
use App\Application\Actions\Member\ViewMemberAction;
use App\Application\Actions\Member\UpdateMemberAction;
use App\Application\Actions\Member\CreateMemberAction;
use App\Application\Actions\Member\DeleteMemberAction;
use App\Application\Actions\Member\GetMemberAttendanceAction;
use App\Application\Actions\Member\AddMemberAttendanceAction;

use App\Application\Actions\Attendance\ListAttendanceForDayAction;
use App\Application\Actions\Attendance\AddAttendanceForDayAction;
use App\Application\Actions\Attendance\DeleteAttendanceAction;

use App\Application\Actions\Badge\ListBadgesAction;
use App\Application\Actions\Badge\CreateBadgeAction;
use App\Application\Actions\Badge\DeleteBadgeAction;
use App\Application\Actions\Badge\UpdateBadgeAction;

use App\Application\Actions\Points\ListPointsAction;
use App\Application\Actions\Points\CreatePointsAction;
use App\Application\Actions\Points\UpdatePointsAction;
use App\Application\Actions\Points\DeletePointsAction;
use App\Application\Actions\Points\GetPointsByMemberIdAction;
use App\Application\Actions\Points\GetSumByMemberAction;
use App\Application\Actions\Points\GetSumForAllMembersAction;

use App\Application\Actions\Reason\ListReasonAction;
use App\Application\Actions\Reason\CreateReasonAction;
use App\Application\Actions\Reason\DeleteReasonAction;
use App\Application\Actions\Reason\UpdateReasonAction;

use App\Application\Actions\User\AuthenticateUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Domain\Member\Member;

return function (App $app) {
    $container = $app->getContainer();

    $prefix = getenv("API_PREFIX");

    $app->get($prefix.'/aaa', function (Request $request, Response $response) {

    	$test = Member::find(1)->toJson();

        $response->getBody()->write($test);
        return $response;
    });

    $app->group($prefix.'/members', function (Group $group) use ($container) {
        $group->get('', ListMembersAction::class);
        $group->get('/names', ListMemberNamesAction::class);
        $group->get('/attendance', ListMembersWithAttendanceAction::class);
        $group->get('/addresses', ListMembersAddressesAction::class);
        $group->get('/role/{role}', GetByRoleAction::class);
        $group->get('/{id}', ViewMemberAction::class);
        $group->get('/{id}/attendance', GetMemberAttendanceAction::class);
        $group->post('/{id}/attendance', AddMemberAttendanceAction::class);
        $group->put('/{id}', UpdateMemberAction::class);
        $group->post('/create', CreateMemberAction::class);
        $group->delete('/{id}', DeleteMemberAction::class);
    });

    $app->group($prefix.'/attendance', function (Group $group) use ($container) {
        $group->get('[/{date}]', ListAttendanceForDayAction::class);
        $group->post('/{date}', AddAttendanceForDayAction::class);
        $group->delete('', DeleteAttendanceAction::class);
    });

    $app->group($prefix.'/user', function (Group $group) use ($container) {
        $group->post('/authenticate', AuthenticateUserAction::class);
    });

    $app->group($prefix . '/badges', function (Group $group) use ($container) {
        $group->get('', ListBadgesAction::class);
        $group->post('/create', CreateBadgeAction::class);
        $group->delete('/{id}', DeleteBadgeAction::class);
        $group->put('/{id}', UpdateBadgeAction::class);
    });

    $app->group($prefix . '/points', function (Group $group) use ($container) {
        $group->get('', ListPointsAction::class);
        $group->post('/create', CreatePointsAction::class);
        $group->put('/{id}', UpdatePointsAction::class);
        $group->get('/sum[/role/{role}]', GetSumForAllMembersAction::class);
        $group->get('/{id}', GetPointsByMemberIdAction::class);
        $group->get('/sum/{id}', GetSumByMemberAction::class);
        $group->delete('/{id}', DeletePointsAction::class);
    });

    $app->group($prefix . '/reason', function (Group $group) use ($container) {
        $group->get('', ListReasonAction::class);
        $group->post('/create', CreateReasonAction::class);
        $group->put('/{id}', UpdateReasonAction::class);
        $group->delete('/{id}', DeleteReasonAction::class);
    });

    $app->get($prefix.'/{test}', function (Request $request, Response $response, $args) {

        $response->getBody()->write('Hello '.$args["test"]);
        return $response;
    });

    // CORS hack
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });
};
