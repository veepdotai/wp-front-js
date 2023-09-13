<?php
$request = "paysage";
$nbImage = 3;
$api_key = "Client-ID BuuOpti6lokv09YODtob5wklRrh-uRbAvOjMreFhgWc";

$opt = array(
    'http'=>array(
        'method'=>"GET",
        'header'=>"Authorization: $api_key\r\n" .
                  "orientation: landscape\r\n"
    )
);

$context = stream_context_create($opt);

$url = "https://api.unsplash.com/search/photos?query=$request&per_page=$nbImage";
$response = file_get_contents($url, false, $context);

// Vérifie si la requête a réussi
if ($response === false) {
    die('Impossible de récupérer les données depuis l\'API Pexels.');
}else {
    echo $response;
}
?>