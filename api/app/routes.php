<?php
declare(strict_types=1);

use App\Application\Actions\Member\ListMembersAction;
use App\Application\Actions\Member\ListMembersWithAttendanceAction;
use App\Application\Actions\Member\ViewMemberAction;
use App\Application\Actions\Member\UpdateMemberAction;
use App\Application\Actions\Member\CreateMemberAction;
use App\Application\Actions\Member\DeleteMemberAction;
use App\Application\Actions\Member\GetMemberAttendanceAction;
use App\Application\Actions\Member\AddMemberAttendanceAction;
use App\Application\Actions\Attendance\ListAttendanceForDayAction;
use App\Application\Actions\Attendance\AddAttendanceForDayAction;
use App\Application\Actions\Attendance\DeleteAttendanceAction;
use App\Application\Actions\User\AuthenticateUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use App\Domain\Member\Member;

return function (App $app) {
    $container = $app->getContainer();

    $prefix = "/attendance-api";

    $app->get($prefix.'/aaa', function (Request $request, Response $response) {

    	$test = Member::find(1)->toJson();

        $response->getBody()->write($test);
        return $response;
    });

    $app->group($prefix.'/members', function (Group $group) use ($container) {
        $group->get('', ListMembersAction::class);
        $group->get('/attendance', ListMembersWithAttendanceAction::class);
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


    $app->get($prefix.'/{test}', function (Request $request, Response $response, $args) {

        $response->getBody()->write('Hello '.$args["test"]);
        return $response;
    });

    // CORS hack
    $app->options('/{routes:.+}', function ($request, $response, $args) {
        return $response;
    });
};
