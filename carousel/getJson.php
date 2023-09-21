<?php
require 'vendor/autoload.php';

$pexels_key = $_POST["apiKeyPexels"];
$unsplash_key = $_POST["apiKeyUnsplash"];

use ImgFinder\Repository\PexelsRepository;
use ImgFinder\Repository\UnsplashRepository;

$nbImage = 2;
$query = $_POST["query"];
$api = [$_POST["api"]];

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

if ($api[0] === "both") {
    $api = ['pexels','unsplash'];
}else{
    $nbImage *= 2;
}

$request = ImgFinder\Request::set($query, $api, 1, $nbImage);
$response = $finder->search($request);

$imagesUrls = $response->toArray();

echo json_encode($imagesUrls);
?>