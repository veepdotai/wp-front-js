$(document).ready(function(){
    $("#unsplash-btn").click(fonctionX("UNSPLASH"));
    $("#pexels-btn").click(fonctionX("PEXELS"));
});

function fonctionX(api){
    $(".widget").empty();
    switch(api){
        case "UNSPLASH":
            $.get("getJsonUnsplash.php", function(json, status){
            
                if (status == "success"){
                    //$("p").text("this is fine");
                    let photos = extractionPhotos(json);
                    initSplide(photos, photos.length);
                }else{
                    $("p").append("ERROR");
                }
            });
            break;

        case "PEXELS":
            $.get("getJsonUnsplash.php", function(json, status){
        
                if (status == "success"){
                    //$("p").text("this is fine");
                    let photos = extractionPhotos(json);
                    initSplide(photos, photos.length);
                }else{
                    $("p").append("ERROR");
                }
            });
            break;
        
        default:
            break;
    }
}