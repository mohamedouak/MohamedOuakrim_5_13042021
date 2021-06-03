//Récupération de l'id de la commande dans le localStorage
let responseId = localStorage.getItem("responseId");
console.log(responseId);

//Récupération du prix total de la commande
let prixTotal = localStorage.getItem("calculPrix");
console.log(prixTotal);

affichagePageConfirmation();

function affichagePageConfirmation(){

//Structure HTML de la page confirmation
let structureConfirmation = document.querySelector("#recapitulatif");

let injectionHtml = `
<p>Nous vous remercions pour votre commande</p>
<p>Total de votre commande : ${prixTotal},00 €</p>
<p>Votre numéro de votre commande : ${responseId} a bien été pris en compte</p>
<p>A bientôt sur Orinoco</p>
`;

structureConfirmation.insertAdjacentHTML("afterbegin", injectionHtml);
}