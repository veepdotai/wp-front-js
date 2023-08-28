/* PARTIE AFFICHAGE DE LA FENETRE/MODAL */
            
// Id :
var image = document.getElementById("image-article"); // l'image


// Affichage du modal lors de l'appui sur la photo
image.onclick = function() {
    let modal = createModal(image);
    document.body.appendChild(modal);

    let xbtn = document.getElementsByClassName("close")[0]; // bouton de fermeture
    
    affichageImages();

    // Fermeture du modal lors de l'appui sur la croix
    xbtn.onclick = function() {
        modal.remove();
    }

    // Fermeture du modal lors de l'appui en dehors de la fenêtre
    window.onclick = function(event) {
        let modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.remove();
        }
    }
}

/* PARTIE IMAGES */

// URLs
// TODO : remplacer par des images prises via l'api des banques d'images
const url0 = "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png";
const url1 = "https://cdn.pixabay.com/photo/2018/01/31/16/12/beach-3121393_1280.png";
const url2 = "https://images.pexels.com/photos/566496/pexels-photo-566496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// Tableau contenant les urls
const urls = [url0, url1, url2];

// Fonction qui change l'image en fonction du paramètre
function changerImage(indiceUrl){
    image.src=urls[indiceUrl];

}

// Fonction qui affichera à terme les images dans le modal et créra les boutons appropriés
function affichageImages(){
    let img;

    // Affiche l'image originelle de l'article à part 
    let imgAct = document.getElementById("image-originelle");
    imgAct.src=urls[0];
    imgAct.onclick = function(){changerImage(0);}

    // Affiche dans le footer du modal les autres images disponibless
    for (let i = 1; i<urls.length; i++){
    
        img = document.createElement("img");

        img.src = urls[i];
        img.onclick = function(){changerImage(i);}
        img.style = "height:100px; cursor:pointer";

        document.getElementById("footer").appendChild(img);
    }
}

/*
 * Construit le modal / la fenêtre de sélection d'image et la renvoie
 */
function createModal(idCible){ // L'id est pour l'instant inutile
    
    // Header :

    let header = document.createElement("div");
    header.className = "modal-header";
        
    let span = document.createElement("span");
    span.className = "close";
    let textNode0 = document.createTextNode("x");

    let titleH = document.createElement("H2");
    let textNode1 = document.createTextNode("Sélection de l'image");

    span.appendChild(textNode0);
    titleH.appendChild(textNode1);

    header.appendChild(span);
    header.appendChild(titleH);

    // Body :

    let body = document.createElement("div");
    body.className = "modal-body";
    
    // TODO : Bar de recherche
    /*
    
    */

    let titleB = document.createElement("H3");
    let textNode2 = document.createTextNode("Image originelle :");
    
    let imgAct = document.createElement("img");
    imgAct.id = "image-originelle";
    imgAct.style = "height: 100px";

    titleB.appendChild(textNode2);

    body.appendChild(titleB);
    body.appendChild(imgAct);

    // Footer :

    let footer = document.createElement("div");
    footer.className = "modal-footer";
    footer.id = "footer";

    // Modal :

    let modal = document.createElement("div");
    modal.id = "myModal";
    modal.className = "modal";
    
    let content = document.createElement("div");
    content.className = "modal-content";
    
    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(footer);

    modal.appendChild(content);

    return modal;
}