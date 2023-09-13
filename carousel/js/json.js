
$(document).ready(function(){

    $.get("http://mysite.local/tests/carousel/getJsonPexels.php", function(json, status){
        
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
    return data.photos;
}

/**
 * Fonction de test qui prend en entree un array de photos et ajoute chaque photo à la page HTML
 * @param {Array} photos 
 * @param {string} idContainer 
 */
function ajoutPhotos(photos, idContainer){
    const imageContainer = document.getElementById(idContainer);
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.landscape; 
        imageContainer.appendChild(imgElement);
    })
}

/**
 * Fonction qui rempli un carousel avec des images dans le format de Pexels
 * @param {String} id 
 * @param {Integer} nbImages 
 * @param {Object[]} images 
 */
function fillSplide(id, nbImages, images) {
    for (let i=0; i<nbImages; i++) {
        $("#splide-"+id + " img")[i].src = images[i].src.landscape;
    }
}