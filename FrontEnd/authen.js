//Récupération de rien du tout ancien code  : des avis eventuellement stockées dans le localStorage

export function ajoutListenerConnexion() {
    const formulaireConnexion = document.querySelector(".login");
    formulaireConnexion.addEventListener("submit", async function (event) {
        rm_tag();
        event.preventDefault();
        // Création de l’objet du nouvel user.
        const user_input = {
            email: event.target.querySelector("[name=mail]").value,
            password: event.target.querySelector("[name=password]").value
        };
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(user_input);
        // Appel de la fonction fetch avec toutes les informations nécessaires
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                // 'Accept': 'application/json',
                "Content-Type": "application/json" },
            body: chargeUtile
        });
        //



        switch (reponse.status) {
            case 200:
                // Récupération des user depuis l'API
                let user = await reponse.json();
                // Stockage des informations dans le localStorage
                window.localStorage.setItem("token", user.token);
                window.location = "."
                
                break;
            case 401:
                ajoutDomErorMail();
                break;
            case 404:
                ajoutDomErorMail();
                break;
            default:
                console.log(`An error occured during login form submission`);
        }

    });

}

ajoutListenerConnexion();


function ajoutDomErorPw(){
    const mailError = document.querySelector("#password");
    const msg = document.createElement("p"); //ajouter class erreur
    msg.classList.add('erreur_login')
    msg.innerText = "Mot de passe incorrect";
    mailError.insertAdjacentElement("afterEnd", msg)

}

function ajoutDomErorMail(){
    const passwordError = document.querySelector("#mail");
    const msg = document.createElement("p"); //ajouter class erreur
    msg.classList.add('erreur_login')
    msg.innerText = "Email incorrect";
    passwordError.insertAdjacentElement("afterEnd", msg)

}

function rm_tag(){
    //cette fº enleve les p av msg err
    let Error = document.querySelector(".erreur_login");
    if (Error) {
        Error.remove();
    }
}

