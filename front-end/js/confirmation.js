//Récupération de l'id de la commande dans le localStorage
let responseId = localStorage.getItem("responseId");

//Récupération du prix total de la commande
let prixTotal = localStorage.getItem("calculPrix");

affichagePageConfirmation();

function affichagePageConfirmation(){

    //Structure HTML de la page confirmation
    let structureConfirmation = document.querySelector("#recapitulatif");

    //Injection du code HTML à afficher dans la page confirmation
    let injectionHtml = `
        <p>Votre commande d'un montant de <strong>${prixTotal},00 €</strong> a bien été prise en compte</p>
        <p>Numéro de votre commande :</p>
        <p><strong>${responseId}</strong></p>
        <p>Nous vous remercions pour votre visite</p>
        <p>A bientôt sur Orinoco</p>
        `;

    structureConfirmation.insertAdjacentHTML("afterbegin", injectionHtml);
};