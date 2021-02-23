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
                'ignore' => ["/attendance-api/user/authenticate", '/attendance-api/aaa'],
                'passthrough' => ['/user/authenticate', '/attendance-api/aaa'],
                'secret' => getenv('JWT_SECRET'),
                "logger" => $logger,
                "secure" => false
            ],
            'db' => [
                'driver' => 'mysql',
                'host' => 'localhost',
                //'port' => 3306,
                'username' => 'root',
                'password' => '',
                'database' => getenv('DATABASE_NAME'),
            ]

            /*'db' => [
                'host' => 'localhost',
                //'port' => 3311,
                'user' => 'jirigalis',
                'pass' => 'i62kgbtr',
                'dbname' => 'zlocinci',
            ]*/
        ],
    ]);
};
