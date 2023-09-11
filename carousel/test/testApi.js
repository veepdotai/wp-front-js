const apiKey = 'wq2JAMdIYANS25GZSqH2qbA3tFS9nSogifigVIJf7KzSEUfh12k9VtBB';
const searchQuery = 'Paysage'; // Remplace par le mot-clé de ton choix
const apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`; // Modifier le nombre d'images si nécessaire

//pexelsRequest();

let photos = extractionPhotos(jsonStr);
//ajoutPhotos(photos,'image-container');

/*
 * Fonction qui prend une chaine de caractere en format JSON et renvoi l'array contenant les photos
 */
function extractionPhotos(str){
    let data = JSON.parse(str);
    return data.photos;
}

/*
 * Prend en entree un array de photos et ajoute chaque photo à la page HTML
 */
function ajoutPhotos(photos, idContainer){
    const imageContainer = document.getElementById(idContainer);
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.landscape; 
        imageContainer.appendChild(imgElement);
    })
}

/*
 * Fait une requete à l'api Pexels et ajoute toutes les photos à la page HTML
 */
async function pexelsRequest() {
    fetch(apiUrl, {
        headers: {
            Authorization: apiKey,
        },
    })
    .then(response => response.json())
    .then(data => {
        const imageContainer = document.getElementById('image-container');

        data.photos.forEach(photo => {
            const imgElement = document.createElement('img');
            imgElement.src = photo.src.landscape; // Ou photo.src.large si tu veux une plus grande résolution
            imgElement.alt = photo.photographer;
            imageContainer.appendChild(imgElement);
        });
    })
    .catch(error => console.error('Erreur :', error));
}