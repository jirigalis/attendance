<?php
declare(strict_types=1);

use DI\ContainerBuilder;
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;

return function (ContainerBuilder $containerBuilder) {
    $logger = new Logger("slim");
    $rotating = new RotatingFileHandler(__DIR__ . "/logs/app.log", 0, Logger::DEBUG);
    $logger->pushHandler($rotating);

    // Global Settings Object
    $containerBuilder->addDefinitions([
        'settings' => [
            'displayErrorDetails' => true, // Should be set to false in production
            'logger' => [
                'name' => 'slim-app',
                'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
                'level' => Logger::DEBUG,
            ],
            'jwt-auth' => [
                'ignore' => [
                    getenv("API_PREFIX") . "/user/authenticate",
                    getenv("API_PREFIX") . '/points/sum/role/D',
                    getenv("API_PREFIX") . '/points/sum/public',
                    getenv("API_PREFIX") . '/badges/members',
                    getenv("API_PREFIX") . '/schoolyear',
                    getenv("API_PREFIX") . '/schoolyear/current',
                    getenv("API_PREFIX") . '/aaa',
                    getenv("API_PREFIX") . '/event/open',
                    getenv("API_PREFIX") . '/event/send-code',
                    getenv("API_PREFIX") . '/event/verify-token',
                    getenv("API_PREFIX") . '/event/register',
                    getenv("API_PREFIX") . '/event/register-by-email',
                ],
                'passthrough' => ['/user/authenticate', '/points/sum/role/D'],
                'secret' => getenv('JWT_SECRET'),
                "logger" => $logger,
                "secure" => false
            ],
            'db' => [
                'driver' => 'mysql',
                'host' => 'localhost',
                //'port' => 3306,
                'username' => getenv('DB_USER'),
                'password' => getenv('DB_PWD'),
                'database' => getenv('DATABASE_NAME'),
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_unicode_ci',
            ]
        ],
    ]);
};
