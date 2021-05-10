let articles = document.getElementById('articles');

//On déclare une fonction pour récupérer tous les articles dans l'API
function recuperationArticles() {
    return fetch ('http://localhost:3000/api/cameras')
        // Si response de l'api on convertie la reponse en json
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
    }

//On fait appel à la fonction déclarée plus haut pour afficher tous les articles    
recuperationArticles()
    .then((articles) => {
       
        //On fait une boucle pour pouvoir afficher chaque article
        for (article of articles){
                document.getElementById('templateArticle');
                cloneElt = document.importNode(templateArticle.content, true);
                
                cloneElt.getElementById('name').innerHTML = article.name
                cloneElt.getElementById('price').innerHTML = article.price / 100 + "," + "00" + "€"
                cloneElt.getElementById('image').src = article.imageUrl
                cloneElt.getElementById('description').innerHTML = article.description
                cloneElt.getElementById('mainArticle').href = `produit.html?${article._id}`
                document.getElementById('articles').appendChild(cloneElt)              
        }
        // Affichage des données dans le code
        
         
    })
    .catch((error) => {
        // Affichage d'un message sur la page 
        // Si les articles n'ont pas été récupérés
        console.log('Erreur de recuperation')
    });
