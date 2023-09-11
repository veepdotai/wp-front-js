initSplide(photos, photos.length);

function initSplide(images, nbImages){
    const widgets = document.getElementsByClassName("widget");
    let id = "";
    let carousel = "";
    
    for (let i=0; i<widgets.length; i++) {
        id = randomId();
        widgets[i].id = "widget-" + id;
        carousel = createHTMLCarousel(id, nbImages);

        $("#widget-" + id).append(carousel);

        fillSplide(id, nbImages, images);

        new Splide('#splide-'+id, {rewind: true}).mount();
    }
}

/**
 * 
 * @param {String} id 
 * @param {Integer} nbImages 
 * @param {Object[]} images 
 */
function fillSplide(id, nbImages, images) {
    for (let i=0; i<nbImages; i++) {
        $("#splide-"+id + " img")[i].src = images[i].src.landscape;
    }
}

/**
 * 
 * @param {String} id 
 * @param {Integer} nbImages 
 * @returns 
 */
function createHTMLCarousel(id, nbImages){
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
}