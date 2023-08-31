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

// Au chargement de la page initialise l'image avec la première de l'array "photos"
document.body.onload = function(){
    changerImage(0);
}


// Fonction qui change l'image en fonction du paramètre
function changerImage(indicePhoto){
    image.src = photos[indicePhoto].src.landscape;
}


// Fonction qui affiche les images dans le modal et créé les boutons appropriés
function affichageImages(){
    let img;

    // Affiche l'image originelle de l'article à part 
    let imgAct = document.getElementById("image-originelle");
    imgAct.src = photos[0].src.landscape;
    imgAct.onclick = function(){changerImage(0);}

    // Affiche dans le footer du modal les autres images disponibless
    for (let i = 1; i<photos.length; i++){
    
        img = document.createElement("img");

        img.src = photos[i].src.landscape;
        img.onclick = function(){changerImage(i);}
        img.className = "modal-img"

       $(".modal-footer").append(img);
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
    let textNode0 = document.createTextNode("X");

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
    imgAct.className = "modal-img"

    titleB.appendChild(textNode2);

    body.appendChild(titleB);
    body.appendChild(imgAct);

    // Footer :

    let footer = document.createElement("div");
    footer.className = "modal-footer";

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