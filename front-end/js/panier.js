let saveProduit = JSON.parse(localStorage.getItem('produit'));
console.log(saveProduit);
console.log(localStorage);

//Séléction de la classe où je vais injecter mon HTML
let panier = document.getElementById('panier');
let tableau = document.getElementById('tableau');

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
affichagePanier();

function affichagePrixTotal(){
    //Déclaration de la variable qui va regrouper les prix inclus dans le panier
    let prixTotal = [];

    //Aller chercher les prix dans le panier
    for (j = 0; j < saveProduit.length; j++){
        let prixProduitPanier = saveProduit[j].price;    

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
    //Injection HTML dans la section panier après le dernier enfant
    panier.insertAdjacentHTML('beforeend', affichagePrix);
}

affichagePrixTotal();

//Séléction des références de tous les btn-delete
let btn = document.querySelectorAll('.btn-delete')
    console.log(btn);

for(let i = 0; i < saveProduit.length; i++){
    btn[i].addEventListener('click', (event) => {
        event.preventDefault();

        //Séléction de l'id du produit qui va être supprimé en cliquant sur le bouton
        let id_supprimer = saveProduit[i]._id;
        console.log(id_supprimer);

        //Avec la méthode filter je séléctionne les éléments à garder et je supprime l'élément où le btn-delete a été cliqué
        let newPanier = saveProduit.filter(el => el._id !== id_supprimer);
            console.log(newPanier);

        //On envoie la variable dans le localStorage
        localStorage.setItem(
            'produit', JSON.stringify(newPanier)
            );
        
            window.location.reload();
    })
}

// //Séléction du bouton supprimer
// let btn_delete = document.getElementById('btn-delete');

// for(let i = 0; i < saveProduit.length; i++){
//     btn_delete.setAttribute('data-id', saveProduit[i]._id);
//     let monId = btn_delete.getAttribute('data-id');    
// };
// //On écoute le bouton et supprimer l'article
// btn_delete.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log(event);

//     let monId = btn_delete.getAttribute('data-id');
//     saveProduit.splice(saveProduit.indexOf(monId), 0);
//     console.log(saveProduit);
//     console.log(monId);    
// });

