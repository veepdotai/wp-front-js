const veepdotai_carousel = { 

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
    }
}

$(document).ready(function(){

    $("#form").submit(function(event){
        event.preventDefault();

        $(".widget").empty();

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
                //$("p").text("this is fine");
                let photos = veepdotai_carousel.extractImages(json);
                veepdotai_carousel.initSplide(photos, photos.length);
            }else{
                $("p").append("ERROR");
            }
        });
    });
});