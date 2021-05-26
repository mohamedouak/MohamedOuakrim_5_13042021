let saveProduit = JSON.parse(localStorage.getItem('produit'));
console.log(saveProduit);

//Séléction de la classe où je vais injecter mon HTML
let panier = document.getElementById('panier')
let tableau = document.getElementById('tableau');
console.log(panier);

//Si le panier est vide : afficher le panier est vide
if(saveProduit == null || saveProduit == 0) {
const panierVide = `
    <div class="panier-vide">Votre panier est vide</div>
`;
    panier.innerHTML = panierVide;
}else{
    //Si le panier n'est pas vide : afficher les produits dans le localStorage
    let produitPanier = [];
    produitPanier = produitPanier + `
    <table id="tableau">
        <tr id="en-tete">
            <th>Produit</th>
            <th>Option</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Action</th>
        </tr>
    </table>
    `;
    for(i = 0; i < saveProduit.length; i++ ){
        produitPanier = produitPanier + `
        <table id="tableau">            
            <tr id="valeurs">
                <td id="produit">${saveProduit[i].name}</td>
                <td id="Option">${saveProduit[i].option_produit}</td>
                <td id="quantite"><input type="number" value="1" min="1" max="10"></td>
                <td id="prix">${saveProduit[i].price}</td>                
                <td><button class="btn-delete" data-id="${saveProduit[i]._id}" ><i class="fas fa-trash-alt"></i></button></td>
            </tr>
        </table>
        `;
    }
        if(i === saveProduit.length){
        //injection HTML dans la page panier
        panier.innerHTML = produitPanier;
    }   
}
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
    if(saveProduit.length !== 0)
        panier.insertAdjacentHTML('beforeend', affichagePrix);

        console.log(saveProduit)
}

affichagePrixTotal();

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
supprimerProduit();
