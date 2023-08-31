$(document).ready(function(){

    initImagesArticle();
    initModaux();
    


    /********************************************************************
     *                      Evenements
     ********************************************************************
     */

    // Ouverture de la fenetre correspondante à l'image cliquée
    $(".widget").click(function(){
        let id = $(this).attr("id");

        $("#modal-" + id).modal({
            clickClose: true,
            showClose: false
        });
    });

    // Changement de l'image concernée lors d'un clic sur une image d'une fenetre
    $(".modal-img").click(function(){
        let modalId = $(this).parents(".modal").attr("id");
        let imageId = modalId.slice(-4);
        let src = $(this).attr("src");

        $("#" + imageId).attr("src", src);
    });
    


    /********************************************************************
     *                      Fonctions
     ********************************************************************
     */
    
    /**
     * Construit le modal / la fenêtre de sélection d'image et la renvoie
     * @param {String} idModal
     */
    function createModal(idModal){
        // Header :

        let header = document.createElement("div");
        header.className = "modal-header";

        let titleH = document.createElement("H2");
        let textNode1 = document.createTextNode("Sélection de l'image");

        titleH.appendChild(textNode1);

        header.appendChild(titleH);

        // TODO : Bar de recherche

        // Body :

        let body = document.createElement("div");
        body.className = "modal-body";
        
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
        modal.id = idModal;
        modal.style ="display:none";
        
        modal.appendChild(header);
        modal.appendChild(body);
        modal.appendChild(footer);

        return modal;
    }

    /**
     * Initialise les différents modaux
     */
    function initModaux(){
        elements = document.getElementsByClassName("widget");

        let imageId;
        let modalId;
        let modal;
        let img;

        for(let i=0; i<elements.length; i++){
            imageId = randomId();
            elements[i].id = imageId;

            modalId = "modal-" + imageId;
            modal = createModal(modalId);

            img = `<img src=${elements[i].src} class="modal-img">`;

            $("body").after(modal);

            $("#"+modalId + " .modal-body").append(img);

            initImageModal(modalId);
        };
    }

    /**
     * Initialise les images de l'article avec des images de l'array "photos"
     */
    function initImagesArticle() {
        let images = document.getElementsByClassName("widget");
        for (let i=0; i<images.length; i++) {
            images[i].src = photos[i].src.landscape;
        }
    }

    /**
     * Initialise les images du "footer" d'un modal avec les images de larray "photo"
     * @param {String} modalId 
     */
    function initImageModal(modalId) {
        for (let i=0; i<photos.length; i++){
            $("#"+modalId + " .modal-footer").append(`<img src=${photos[i].src.landscape} class="modal-img">`);
        }
    }
});