$(document).ready(function(){

    let modal = createModal();
    $(".widget").after(modal);

    $(".widget").click(function(){
        let src = $(this).attr("src");
        let str = `<img src=${src} class="modal-img">`;
        $(this).next().append(str);
        $(this).next().modal({
            clickClose: true,
            showClose: false
        });
    });

    /*
    * Construit le modal / la fenêtre de sélection d'image et la renvoie
    */
    function createModal(){ // L'id est pour l'instant inutile
        
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
        modal.id = "demo";
        modal.style ="display:none";
        
        modal.appendChild(header);
        modal.appendChild(body);
        modal.appendChild(footer);

        return modal;
    }
});
