<?php
    $request = "paysage";
    $nbImage = 3;
    $api_key = "wq2JAMdIYANS25GZSqH2qbA3tFS9nSogifigVIJf7KzSEUfh12k9VtBB";

    $opt = array(
        'http'=>array(
            'method'=>"GET",
            'header'=>"Authorization: $api_key"
        )
    );

    $context = stream_context_create($opt);

    $url = "https://api.pexels.com/v1/search?query=$request&per_page=$nbImage";
    $response = file_get_contents($url, false, $context);
    
    // Vérifie si la requête a réussi
    if ($response === false) {
        die('Impossible de récupérer les données depuis l\'API Pexels.');
    }else {
        echo $response;
    }
?>