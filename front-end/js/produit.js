//Séléction de la section 'article' dans laquelle je vais injecter mon HTML
let article = document.getElementById('article');

const idProduit = window.location.search;

const urlParams = new URLSearchParams(idProduit);

const leId = idProduit.slice(1);

//Fonction par laquelle je vais récupérer chaque article avec son id
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
        
        // Affichage
        affichageProduit(article);
        
        // bouton ajouter au panier                
        ajoutPanier(article);
        
        // Affichage des données dans le code
        
         
    })
    .catch((error) => {
        // Affichage d'un message sur la page 
        // Si les articles n'ont pas été récupérés
        console.log('Erreur de recuperation')
    });   

    /**
     * @param {object} article - Objet produit
     */
    
    // Fonction pour afficher chaque produit séléctionné depuis la page index dans la page produit
    function affichageProduit(article) {

        //Séléction de la balise template HTML à clôner + clônage
        document.getElementById('templateProduit');
        cloneElt = document.importNode(templateProduit.content, true);

        //Injection des éléments de chaque produit dans une balise HTML grâce à l'id 
        cloneElt.getElementById('name_produit').innerHTML = article.name
        cloneElt.getElementById('price_produit').innerHTML = article.price / 100 + "," + "00" + "€"
        cloneElt.getElementById('image_produit').src = article.imageUrl
        cloneElt.getElementById('description_produit').innerHTML = article.description

        // Création d'une variable dans lequel sont stockées les options
        let choice = cloneElt.getElementById('option_produit')

        // On fait une boucle sur le tableau des options
        article.lenses.forEach(function (lense) {

        //Variable option dans lequel on va créer une balise HTML option
        let option = document.createElement('option');

        //On injecte le texte dans la balise option
        option.setAttribute('value', lense);
        option.textContent = lense;

        //Création d'une balise enfant option pour chaque option
        choice.appendChild(option);                                 
        });

        //En fonction du nombre d'articles on va crée un enfant pour chaque élément clôné
        document.getElementById('article').appendChild(cloneElt)   
    }

    //Création fonction pour ajouter l'article dans le panier et localStorage lors du click
    function ajoutPanier(article) {      

        //Séléction de l'id du produit
        const idSelect = document.getElementById('option_produit');        
        
        //Séléction du bouton
        let selectButton = document.getElementById('btn_add');
        console.log(selectButton);

        //Ecouter le bouton et envoyer panier
        selectButton.addEventListener('click', (event) => {
            event.preventDefault();

            //Choix de l'utilisateur dans une variable
            let userChoice = idSelect.value;
            console.log(userChoice);
            
            // 1. Vérifier si l'id du produit n'existe pas deja dans mon panier
            // panier.find( (produit) => produit._id === nouveau_produit._id ) si elle renvoie qqch -> le produit existe dans mon panier
            // si il n'existe pas -> ajouter normal
            // si il existe -> quantite = quantité + 1
            
            //Récupération des valeurs du produit
            let valeurProduit = {
                lenses: article.lenses,
                _id: article._id,
                idDelete: Math.floor(Math.random() * 9999) + '_' + article._id,
                name: article.name,
                option_produit: userChoice,
                imageUrl: article.imageUrl,
                price: article.price,
                quantite: 1      
            }
            console.log(valeurProduit);
            
            // Variable dans laquelle sont stockées la value et la key qui sont dans le localstorage 
            let saveProduit = JSON.parse(localStorage.getItem('produit'));
            console.log(saveProduit);
            
            //Fonction ajout produit séléctionné dans le localStorage
            function ajoutProduitLocalStorage () {
                saveProduit.push(valeurProduit);
                localStorage.setItem('produit', JSON.stringify(saveProduit));
            };   
            //S'il y'a un produit dans le localstorage éxécuter... sinon éxécuter...
            if(saveProduit){
                ajoutProduitLocalStorage();

                console.log(saveProduit);
            }else{
                saveProduit = [];
                ajoutProduitLocalStorage();

                console.log(saveProduit);
            }
        });
    }

    