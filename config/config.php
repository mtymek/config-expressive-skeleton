<?php

use Zend\ConfigAggregator\PhpFileProvider;

$aggregator = new Zend\ConfigAggregator\ConfigAggregator(
    [
        App\ConfigProvider::class,
        new PhpFileProvider('config/autoload/{{,*.}global,{,*.}local}.php')
    ],
    'data/cache/app_config.php'
);

return $aggregator->getMergedConfig();
