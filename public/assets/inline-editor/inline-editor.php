<?php
    include 'https://mysite.local/wp-includes/meta.php';

    $idModifie = $_POST["idModifie"];
    $newHtml = $_POST["newHtml"];

    $actualContent = get_metadata( 'post', 14, "post_content");

    $newPostContent = "<!-- wp:paragraph -->" . $newHtml . "<!-- /wp:paragraph -->";

    echo($actualContent);
?>