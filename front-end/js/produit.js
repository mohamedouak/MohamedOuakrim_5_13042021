let article = document.getElementById('article');

const idProduit = window.location.search;

const urlParams = new URLSearchParams(idProduit);

const leId = idProduit.slice(1);

function recuperationArticle() {
    return fetch (`http://localhost:3000/api/cameras/${leId}`)
        // Si response de l'api on convertie la reponse en json
        .then((res) => {
            if (res.ok) {
                return res.json()             
            }
        })
    }

recuperationArticle()
    .then((article) => {
        console.log(article)
        
                document.getElementById('templateProduit');
                cloneElt = document.importNode(templateProduit.content, true);

                cloneElt.getElementById('name_produit').innerHTML = article.name
                cloneElt.getElementById('price_produit').innerHTML = article.price / 100 + "," + "00" + "€"
                cloneElt.getElementById('image_produit').src = article.imageUrl
                cloneElt.getElementById('description_produit').innerHTML = article.description
                // options
                cloneElt.getElementById('option_1').innerHTML = article.lenses[0]
                cloneElt.getElementById('option_2').innerHTML = article.lenses[1]
                cloneElt.getElementById('option_3').innerHTML = article.lenses[2]
                // bouton ajouter au panier                
                
                document.getElementById('article').appendChild(cloneElt)       
        // Affichage des données dans le code
        
         
    })
    .catch((error) => {
        // Affichage d'un message sur la page 
        // Si les articles n'ont pas été récupérés
        console.log('Erreur de recuperation')
    })