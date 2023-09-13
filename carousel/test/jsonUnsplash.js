$(document).ready(function(){

    $.get("http://mysite.local/tests/carousel/test/getJsonUnsplash.php", function(json, status){
        
        if (status == "success"){
            //$("p").text("this is fine");
            let photos = extractionPhotos(json);
            initSplide(photos, photos.length);
        }else{
            $("p").append("ERROR");
        }
    });
    
});

/**
 * Fonction qui prend une chaine de caractere en format JSON et renvoi l'array contenant les objets photos
 * @param {string} str 
 * @returns {Array} 
 */
function extractionPhotos(str){
    let data = JSON.parse(str);
    return data.results;
}

/**
 * Fonction qui rempli un carousel avec des images dans le format de Unsplash
 * @param {string} id 
 * @param {int} nbImages 
 * @param {Array} images 
 */
function fillSplideUnsplash(id, nbImages, images){
    for (let i=0; i<nbImages; i++) {
        $("#splide-"+id + " img")[i].src = images[i].urls.regular;
    }
}