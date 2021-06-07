let saveProduit = JSON.parse(localStorage.getItem('produit'));

//Séléction de la classe où je vais injecter mon HTML
let panier = document.getElementById('panier');
let tableau = document.getElementById('tableau');


affichagePanier();
calculPrixTotal();
affichagePrixTotal(calculPrixTotal());
supprimerProduit();
validationFormulaire();
getDatas();

//Fonction avec laquelle j'affiche le panier
function affichagePanier (){
    if (saveProduit == null || saveProduit == 0){
    
    panier.innerHTML = "Votre panier est vide"
    }else{

        for(i = 0; i < saveProduit.length; i++ ){

            //Séléction de la balise template HTML à clôner + clônage
            document.getElementById('templatePanier');
            cloneElt = document.importNode(templatePanier.content, true);

            //Injection des éléments de chaque produit dans une balise HTML grâce à son id 
            cloneElt.getElementById('produit').innerHTML = saveProduit[i].name
            cloneElt.getElementById('Option').innerHTML = saveProduit[i].option_produit
            cloneElt.getElementById('prix').innerHTML = saveProduit[i].price / 100 + ',' + '00' + '€'

            //En fonction du nombre d'articles on va crée un enfant pour chaque élément clôné
            document.getElementById('tableau').appendChild(cloneElt)
        }
    }
    
}

function calculPrixTotal() {
    
    //Déclaration de la variable qui va regrouper les prix inclus dans le panier
    let prixTotal = [];
    
    //Aller chercher les prix dans le panier
    for (i = 0; i < saveProduit.length; i++){
        let prixProduitPanier = saveProduit[i].price / 100;    
        
        //Mettre prix total dans la variable prixTotal
        prixTotal.push(prixProduitPanier);
    }
    
    //Additionner les prix qui sont dans la variable prixTotal avec la méthode reduce
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
    let calculPrix = prixTotal.reduce(reducer, 0);
    
    // Ajout du prix dans le local storage
    localStorage.setItem('calculPrix', JSON.stringify(calculPrix));

    return calculPrix;   
}

function affichagePrixTotal(calculPrix) {
    //Séléction de la balise dans laquelle on va injecter le code    
    let prix_total = document.querySelector('.prix_total')

    //Le code HTML du prix total à afficher
    const affichagePrix = `                                
            <p id="text_total">Total :</p>
            <div id="total">${calculPrix},00 €</div>                     
    `
    if(saveProduit.length !== 0)
        prix_total.innerHTML = affichagePrix;
}



function supprimerProduit(){
    //Séléction des références de tous les btn-delete
    let btn = document.querySelectorAll('.btn-delete')

    //On fait une boucle for pour chaque élément du panier à supprimer
    for(let i = 0; i < saveProduit.length; i++){
        btn[i].addEventListener('click', (event) => {
            event.preventDefault();

            //Séléction de l'id du produit qui va être supprimé en cliquant sur le bouton
            let id_supprimer = saveProduit[i].idDelete;

            //Avec la méthode filter je séléctionne les éléments à garder et je supprime l'élément où le btn-delete a été cliqué
            saveProduit = saveProduit.filter( el => el.idDelete !== id_supprimer);

            //On envoie la variable dans le localStorage
            localStorage.setItem(
                'produit', JSON.stringify(saveProduit)
                );
            // alert('Ce produit a été supprimé du panier')
            alert('Ce produit a été supprimé')
            window.location.href = 'panier.html';
        });        
    }
} 

//------------------Formulaire de validation-------------------

function validationFormulaire() {

    document.querySelector('.form button').addEventListener('click', function(){
        for (let input of document.querySelectorAll('.form input,.form textarea')) {
            var valid = true;
            valid &= input.reportValidity();
            if(!valid){
                break;                            
            }
        }
        if (valid){
            requetePost(getDatas());
        }else{
            alert ('Veuillez bien saisir le formulaire')
        }      
    });
}

function getDatas() {

    // Récupération des données du formulaire à envoyer
    let firstName = document.querySelector('#prenom').value
    let lastName = document.querySelector('#nom').value
    let address = document.querySelector('#adresse').value
    let city = document.querySelector('#ville').value
    let email = document.querySelector('#email').value

    // Création d'un objet où l'on va stocker les champs requis à envoyer
    let contact = 
    {
        'firstName': firstName,
        'lastName': lastName,
        'address': address,
        'city': city,
        'email': email,
    }

    // Récupération des éléments du localStorage
    let produitPanier = localStorage.getItem('produit');
    let monPanier = JSON.parse(produitPanier);    

     // Création d'un tableau dans lequel on va stocker tous les id récupérés dans le panier
     let products = []

     for (let i = 0; i < monPanier.length; i++){
         // Variable dans laquelle on va récupérer les id du panier pour ensuite les intégrer dans le tableau
         let listId = monPanier[i]
         products.push(listId._id)
     }
 
     // Objet dans lequel on stocke les éléments à envoyer au serveur
     let body = {contact, products}

     // Séléction de la classe où je vais injecter mon HTML
    let formulaire = document.getElementById('formulaire')

    // Masquer le formulaire si panier = 0
    if (monPanier.length == null || monPanier.length == 0){
    
        formulaire.innerHTML = ""
    }

     return body     
}
     
function requetePost(body){       

    //Envoi de l'objet au serveur
    let envoi = fetch ('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        body: JSON.stringify (body),
        headers: {
            'content-Type': 'application/json'
        },
            
    })
    .then((res) => {
        if (res.ok) {
            return res.json()             
        }
    })    
    .then((json) => {

        const contenu = json;

        // Mettre le id dans le localStorage
        localStorage.setItem ('responseId', contenu.orderId);

        // Aller vers la page confirmation
        document.location.href=`confirmation.html?${contenu.orderId}`;

    }).catch((error) => {
        
        alert('Erreur de requête');
    });
}






