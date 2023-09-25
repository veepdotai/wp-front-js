
// A remplacer par ses propres clés
const apiKeyPexels = pexelsKey;
const apiKeyUnsplash = unsplashKey;

// permet d'échanger entre un mod static avec des données locales et un mode en ligne où les requêtes sont faites aux api
const staticMode = false;

const pathToCarousel = window.location.protocol + "//" + window.location.hostname + "/tests/carousel";

const VeepdotaiCarousel = { 

    /**
     * Fonction qui crée les différentes instances de carrousels et les ajoute à tous les éléments de classe "widget"
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

            $(".widget img:first").hide();

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
        this.createButtons();
    },

    /**
     * Fonction qui fabrique la structure HTML du formulaire en chaîne de caracteres
     * @param {string} defaultQuery 
     */
    formStr: function(defaultQuery){
        let str = `
            <form id="carousel-form" method="get" autocomplete="on">
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
        return str;
    },

    /**
     * Fonction qui fabrique la structure HTML des boutons d'annulation/validation en chaîne de caracteres et l'ajoute à la page
     */
    createButtons: function(){
        const str = `
            <div id="boutons">
                <button id="validation">Valider</button>

                <button id="annulation">Annuler</button>
            </div>
        `; 
        $(".splide__track").append(str);
    },

    initWidget: function(){
        $(".widget").append(this.formStr(""));
        $("#carousel-form").hide();
    },

    initClick: function(){
        $("figure img").click(function(){
            let id = VeepdotaiCarousel.randomId();
            $(this).attr("id","img-" + id);
            let queryImage = $(this).attr("alt");
            document.getElementById("query").value = queryImage;
            $("#carousel-form").show();
        });
    },

    initForm: function(){
        $("#carousel-form").submit(function(event){
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
    
            const data = {query, api, apiKeyPexels, apiKeyUnsplash};

            if (staticMode) {
                $("#debug").text("STATIC MODE - request: Paysage");
                let json;
                switch(api){
                    case "pexels":
                        json = staticJsonPexels;
                        break;
                    case "unsplash":
                        json = staticJsonUnsplash;
                        break;
                    case "both":
                        json = staticjson;
                        break;
                }
                VeepdotaiCarousel.processJson(json);
            
            }else {
                $.post(pathToCarousel + "/getJson.php", data, function(json, status){ 
                    if (status == "success"){
                        VeepdotaiCarousel.processJson(json);
                    }else{
                        $("#debug").append("ERROR");
                    }
                });
            }
        });
    },

    /**
     * 
     * @param {string} json 
     */
    processJson: function(json){

        //$("#debug").text(json);
        let photos = VeepdotaiCarousel.extractImages(json);
        VeepdotaiCarousel.initSplide(photos, photos.length);

        $("#annulation").click(function(){
            $(".widget .splide").remove();
            $(".widget img:first").show();
        });

        $("#validation").click(function(){
            let url = $(".is-active").children("img").attr("src");
            $(".widget img:first").attr("src",url);
            $(".widget img:first").attr("alt",document.getElementById("query").value);
            $(".widget .splide").remove();
            $(".widget img:first").show();
        });
    },

    widget: function(){
        this.initWidget();
        this.initClick();
        this.initForm();
    }
}

$(document).ready(function(){
    VeepdotaiCarousel.widget();   
});