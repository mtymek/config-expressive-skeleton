<?php

namespace App;

class ConfigProvider
{
    public function __invoke()
    {
        return [
            'templates' => [
                'layout' => 'layout/default',
                'map' => [
                    'layout/default' => 'module/App/templates/layout/default.phtml',
                    'error/error'    => 'module/App/templates/error/error.phtml',
                    'error/404'      => 'module/App/templates/error/404.phtml',
                ],
                'paths' => [
                    'app'    => ['module/App/templates/app'],
                    'layout' => ['module/App/templates/layout'],
                    'error'  => ['module/App/templates/error'],
                ],
            ],
        ];
    }
}
