const apiKey = 'wq2JAMdIYANS25GZSqH2qbA3tFS9nSogifigVIJf7KzSEUfh12k9VtBB';
const searchQuery = 'Paysage'; // Remplace par le mot-clé de ton choix
const apiUrl = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`; // Modifier le nombre d'images si nécessaire

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