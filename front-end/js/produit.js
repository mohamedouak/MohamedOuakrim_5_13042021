//Séléction de la section 'article' dans laquelle je vais injecter mon HTML
let article = document.getElementById('article');

//On va chercher l'id du produit en question 
const idProduit = window.location.search;

//On supprime le point d'interrogation de l'url avec la méthode slice
const leId = idProduit.slice(1);

recuperationProduit();

//Fonction par laquelle je vais récupérer chaque article avec son id
function recuperationProduit() {

  return  fetch(`http://localhost:3000/api/cameras/${leId}`)

      // Si response de l'api on convertie la reponse en json
      .then((res) => {

        if (res.ok) {
          return res.json();

        };
      })
      .then((article) => {
        
        affichageProduit(article);    
        
        ajoutPanier(article);
    
      })
      .catch((error) => {
        
        alert('Erreur de recuperation');

      });
};

function affichageProduit(article) {

  //Séléction de la balise template HTML à clôner + clônage
  document.getElementById('templateProduit');
  cloneElt = document.importNode(templateProduit.content, true);

  //Injection des éléments de chaque produit dans une balise HTML grâce à l'id
  cloneElt.getElementById('name_produit').innerHTML = article.name;
  cloneElt.getElementById('price_produit').innerHTML = article.price / 100 + "," + "00" + "€";
  cloneElt.getElementById('image_produit').src = article.imageUrl;
  cloneElt.getElementById('description_produit').innerHTML = article.description;
    

  // Création d'une variable dans lequel sont stockées les options
  let choice = cloneElt.getElementById('option_produit');

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
  document.getElementById('article').appendChild(cloneElt);
};

//Création fonction pour ajouter l'article dans le panier et localStorage lors du click
function ajoutPanier(article) {

  //Séléction de la balise option produit
  const idSelect = document.getElementById('option_produit');

  //Séléction du bouton
  let selectButton = document.getElementById('btn_add');

  //Ecouter le bouton et envoyer panier
  selectButton.addEventListener('click', (event) => {
    event.preventDefault();

    //Choix de l'utilisateur dans une variable
    let userChoice = idSelect.value;
    
    //Récupération des valeurs du produit
    let valeurProduit = {
      lenses: article.lenses,
      _id: article._id,
      idDelete: Math.floor(Math.random() * 9999) + "_" + article._id,
      name: article.name,
      option_produit: userChoice,
      imageUrl: article.imageUrl,
      price: article.price,
      quantite: 1,
    };
    
    // Controle si le panier existe dans le LS
    let monPanier = localStorage.getItem('produit');

    // Si le panier est null
    if (localStorage.getItem('produit') == null) {
      
        // recuperer la valeur du tableau panierArray
        let panierArray = [];

        // ajouter un produit dans l'array
        panierArray.push(valeurProduit);

        // transformer objet en string
        let panierArrayJSON = JSON.stringify(panierArray);

        // mettre à jour le LS
        localStorage.setItem('produit', panierArrayJSON);

    //Si le panier existe    
    }else{      

      // Prende la valeur du panier LS et parse pour ajouter un nouveau produit
      let parsedPanier = JSON.parse(localStorage.getItem('produit'));
      
      // On confirme qu'il n'y a pas ca
      let flag = false; 

      for (let elem of parsedPanier) {

          // On verifie _id et l'option et on incrémente la quantité à chaque clic
          if (elem._id == valeurProduit._id && elem.option_produit == valeurProduit.option_produit) {
              elem.quantite++;

              // si identique alors le flag devient true
              flag = true;
              
              elem.totalprice = (elem.quantite * parseInt(elem.price))+' €';

                // on actualise le panier
              localStorage.setItem('produit', JSON.stringify(parsedPanier));
          };
      };
      if (flag === false) {

      // ajouter un produit dans l'array
      parsedPanier.push(valeurProduit);

      // mettre à jour le LS
      localStorage.setItem('produit', JSON.stringify(parsedPanier));

      alert('Article bien ajouté au panier');

      }else{

        alert('Article de nouveau ajouté au panier');

      };
    };    
  });
};


