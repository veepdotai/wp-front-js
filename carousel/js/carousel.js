const VeepdotaiCarousel = { 

    /**
     * Fonction qui crée les différentes instances de carrousels et les ajoute à la page
     * @param {Array} images 
     * @param {int} nbImages 
     */
    initSplide: function(images, nbImages){
        const widgets = document.getElementsByClassName("widget");
        let id = "";
        let carousel = "";
        
        for (let i=0; i<widgets.length; i++) {
            id = this.randomId();
            widgets[i].id = "widget-" + id;
            carousel = this.createHTMLCarousel(id, nbImages);

            $("#widget-" + id).append(carousel);

            this.fillSplide(id, nbImages, images);

            $(".wp-block-post-featured-image img:first").hide();

            new Splide('#splide-'+id, {rewind: true}).mount();
        }
    },

    /**
     * Fonction qui fabrique la structure HTML d'un carrousel en chaîne de caracteres
     * @param {string} id 
     * @param {int} nbImages 
     * @returns {string}
     */
    createHTMLCarousel: function(id, nbImages){
        let str =
        `<div id="splide-${id}" class="splide" aria-label="Splide Basic HTML Example">
                <div class="splide__track">
                    <div class="splide__list">`;

        for (let i=0; i<nbImages; i++) {
            str +=     `<div class="splide__slide">
                            <img class="splide__image" src="">
                        </div>`;
        }
                
        str +=     `</div>
                </div>
            </div>`
        ;
        
        return str;
    },

    /**
     * Fonction qui renvoie un id aléatoire
     * @returns {string}
     */
    randomId: function(){
        return Math.floor((1 + Math.random())* 0x10000)
            .toString(16)
            .substring(1);
    },

    /**
     * Fonction qui prend une chaine de caractere en format JSON et renvoi l'array contenant les objets photos
     * @param {string} json 
     * @returns {Array} 
     */
    extractImages: function(json){
        let images = JSON.parse(json);
        return images;
    },

    /**
     * Fonction qui rempli un carousel avec les images passées en param
     * @param {String} id 
     * @param {Integer} nbImages 
     * @param {Object[]} images 
     */
    fillSplide: function(id, nbImages, images) {
        for (let i=0; i<nbImages; i++) {
            $("#splide-"+id + " img")[i].src = images[i].media;
        }
        this.afficheBoutons();
    },

    /**
     * 
     * @param {string} idElement 
     * @param {string} defaultQuery 
     */
    afficheForm: function(idElement, defaultQuery){
        let str = `
            <form id="form" method="get" autocomplete="on">
                <input id="query" type="text" name="recherche" value="${defaultQuery}"><br>
                <input id="api-pex" type="radio" name="api" value="pexels">
                <label for="api-pex">Pexels</label><br>
                <input id="api-unsp" type="radio" name="api" value="unsplash">
                <label for="api-unsp">Unsplash</label><br>
                <input id="api-both" type="radio" name="api" value="both" checked>
                <label for="api-both">Both</label><br>

                <button type="submit">Lancer recherche</button>
            </form>
        `;
        //$("#form").remove();
        $("#"+idElement).parent().append(str);
    },

    afficheBoutons: function(){
        const str = `
            <div id="boutons">
                <button id="validation">Valider</button>

                <button id="annulation">Annuler</button>
            </div>
        `; 
        $(".splide__track").append(str);
    }

}

$(document).ready(function(){
    $("#form").hide();

    $("figure img").click(function(){
        let id = VeepdotaiCarousel.randomId();
        $(this).attr("id","img-" + id);
        let queryImage = $(this).attr("alt");
        document.getElementById("query").value = queryImage;
        $("#form").show();
    });


    $("#form").submit(function(event){
        event.preventDefault();

        $(".widget .splide").remove();

        $("form").hide();

        const query = document.getElementById("query").value;
        
        const radios = document.getElementsByName("api");
        let api = "";
        for (let i=0; i<radios.length; i++){
            if (radios[i].checked) {
                api = radios[i].value;
            }
        }

        const data = {query, api}; // @TODO ajouter nb photos ?

        $.post("http://mysite.local/tests/carousel/getJson.php", data, function(json, status){
            
            if (status == "success"){
                //$("p").text(json);
                let photos = VeepdotaiCarousel.extractImages(json);
                VeepdotaiCarousel.initSplide(photos, photos.length);

                $("#annulation").click(function(){
                    $(".widget .splide").remove();
                    $(".wp-block-post-featured-image img:first").show();
                });

                $("#validation").click(function(){
                    let url = $(".is-active").children("img").attr("src");
                    $(".wp-block-post-featured-image img:first").attr("src",url);
                    $(".wp-block-post-featured-image img:first").attr("alt",document.getElementById("query").value);
                    $(".widget .splide").remove();
                    $(".wp-block-post-featured-image img:first").show();
                });



            }else{
                $("p").append("ERROR");
            }
        });
    });
});