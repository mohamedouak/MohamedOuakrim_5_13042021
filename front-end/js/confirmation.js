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
<p>Votre commande d'un montant de ${prixTotal},00 € a bien été prise en compte</p>
<p>Numéro de votre commande : ${responseId}</p>
<p>Nous vous remercions pour votre visite</p>
<p>A bientôt sur Orinoco</p>
`;

structureConfirmation.insertAdjacentHTML("afterbegin", injectionHtml);
}