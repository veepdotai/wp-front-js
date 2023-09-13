<?php
require 'vendor/autoload.php';

$pexels_key = 'wq2JAMdIYANS25GZSqH2qbA3tFS9nSogifigVIJf7KzSEUfh12k9VtBB';
$unsplash_key = 'BuuOpti6lokv09YODtob5wklRrh-uRbAvOjMreFhgWc';

use ImgFinder\Repository\PexelsRepository;
use ImgFinder\Repository\UnsplashRepository;

$settings = [
    'img-finder' => [
        'repositories' => [
            PexelsRepository::class => [
                'params' => [
                    'authorization' => $pexels_key
                ]
            ],
            UnsplashRepository::class => [
                'params' => [
                    'authorization' => $unsplash_key
                ]
            ]
        ]
    ]
];

$config = ImgFinder\Config::fromArray($settings);
$finder = new ImgFinder\ImgFinder($config);

$nb_page = 2;

$request = ImgFinder\Request::set('nature',['pexels', 'unsplash'], 1, $nb_page);
$response = $finder->search($request);

$imagesUrls = $response->toArray();

echo json_encode($imagesUrls);
?>