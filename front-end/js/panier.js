let saveProduit = JSON.parse(localStorage.getItem('produit'));
console.log(saveProduit);

//Séléction de la classe où je vais injecter mon HTML
let panier = document.getElementById('panier');
let tableau = document.getElementById('tableau');


affichagePanier();
affichagePrixTotal();
supprimerProduit();

// if (validationFormulaire()) {
//     requetePost()
// } else {
//     // affichage alert error
// }


//Fonction avec laquelle j'affiche le panier
function affichagePanier (){
    if (saveProduit == null || saveProduit == 0){
    // const element = document.createElement('p')
    // document.getElementById('panier').appendChild(panierVide)
    panier.innerHTML = "Votre panier est vide"
    }else{

        for(i = 0; i < saveProduit.length; i++ ){
        //Séléction de la balise template HTML à clôner + clônage
        document.getElementById('templatePanier');
        cloneElt = document.importNode(templatePanier.content, true);

        //Injection des éléments de chaque produit dans une balise HTML grâce à son id 
        cloneElt.getElementById('produit').innerHTML = saveProduit[i].name
        cloneElt.getElementById('Option').innerHTML = saveProduit[i].option_produit
        cloneElt.getElementById('prix').innerHTML = saveProduit[i].price

        //En fonction du nombre d'articles on va crée un enfant pour chaque élément clôné
        document.getElementById('tableau').appendChild(cloneElt)
        }
    }
    
}


function affichagePrixTotal(){
    //Déclaration de la variable qui va regrouper les prix inclus dans le panier
    let prixTotal = [];

    //Aller chercher les prix dans le panier
    for (i = 0; i < saveProduit.length; i++){
        let prixProduitPanier = saveProduit[i].price;    

        //Mettre prix total dans la variable prixTotal
        prixTotal.push(prixProduitPanier);
    }

    //Additionner les prix qui sont dans la variable prixTotal avec la méthode reduce
    const reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue);
    let calculPrix = prixTotal.reduce(reducer, 0);

    //Le code HTML du prix total à afficher
    const affichagePrix = `
        <div class="prix_total">                        
            <p id="text_total">Total :</p>
            <div id="total">${calculPrix},00 €</div>
        </div>               
    `
    if(saveProduit.length !== 0)
        panier.insertAdjacentHTML('beforeend', affichagePrix);
        console.log(saveProduit);
}



function supprimerProduit(){
    //Séléction des références de tous les btn-delete
    let btn = document.querySelectorAll('.btn-delete')
    console.log(btn);

    //On fait une boucle for pour chaque élément du panier à supprimer
    for(let i = 0; i < saveProduit.length; i++){
        btn[i].addEventListener('click', (event) => {
            event.preventDefault();

            //Séléction de l'id du produit qui va être supprimé en cliquant sur le bouton
            let id_supprimer = saveProduit[i]._id;
            console.log('id suppr', id_supprimer);

            //Avec la méthode filter je séléctionne les éléments à garder et je supprime l'élément où le btn-delete a été cliqué
            saveProduit = saveProduit.filter( el => el._id !== id_supprimer);
                console.log('saveprod', saveProduit);

            //On envoie la variable dans le localStorage
            localStorage.setItem(
                'produit', JSON.stringify(saveProduit)
                );
            // alert('Ce produit a été supprimé du panier')
            window.location.href = 'panier.html';
        })
        
    }
}




//------------------Formulaire de validation-------------------


document.querySelector('.form button').addEventListener('click', function(){
    for (let input of document.querySelectorAll('.form input,.form textarea')) {
        var valid = true;
        valid &= input.reportValidity();
        if(!valid){
            break;            
        }
    }
    if(valid){
        
    }
    console.log(valid);
    
    // Récupération des données du formulaire à envoyer
    let firstName = document.querySelector('#prenom').value
    let lastName = document.querySelector('#nom').value
    let address = document.querySelector('#adresse').value
    let city = document.querySelector('#ville').value
    let email = document.querySelector('#email').value
    // 1 --- OBJET CONTACT CONTENANT INFORMATIONS DU FORMULAIRE, AVEC LA NOMENCLATURE SUIVANTE (ATTENTION A BIEN RESPECTER CETTE NOMENCLATURE)

    // Création d'un objet où l'on va stocker les champs requis à envoyer
    let contact = 
    {
        'firstName': firstName,
        'lastName': lastName,
        'address': address,
        'city': city,
        'email': email,
    }
    console.log(contact);
    // 2 --- ARRAY (TABLEAU) PRODUCTS CONTENANT LES IDENTIFIANTS DE CHAQUE PRODUIT QUE VOUS AVEZ DANS LE PANIER

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
    console.log(products);

    // 3 --- ENVOYER L'OBJET CONTACT && L'ARRAY PRODUCTS DANS LE BODY DE LA REQUETE POST

    // Objet dans lequel on stocke les éléments à envoyer au serveur
    let body = {contact, products}
    console.log(body);

    //Envoi de l'objet au serveur
    
    const envoi = fetch ('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        body: JSON.stringify (body),
        headers: {
            'content-Type': 'application/json'
        },

    });
    console.log('envoi');
    console.log(envoi);    
   
});




