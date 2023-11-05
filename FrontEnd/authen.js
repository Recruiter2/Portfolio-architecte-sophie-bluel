//Récupération de rien du tout ancien code  : des avis eventuellement stockées dans le localStorage
//let user = window.localStorage.getItem('user');

// if (user === null){
//     //alert vous etes pas connecte -> redirect vers auth ou pas...
//     // Récupération des idetifiants depuis l'API quand il click connexion
//     const reponse = await fetch('http://localhost:5678/api/users/login');
//     console.log("response.status =", reponse.status);
//     if (reponse.status = 200) {
//         user = await reponse.json();
//         // Transformation des pièces en JSON
//         const valeurUser = JSON.stringify(user);
//         // Stockage des informations dans le localStorage
//         window.localStorage.setItem("user", valeurUser);
//     }
//
// }else{
//     user = JSON.parse(user);
// }

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
        // console.log("reponse.status =", reponse);
        switch (reponse.status) {
            case 200:
                // Récupération des user depuis l'API
                let user =  reponse.json();
                // Stockage des informations dans le localStorage
                window.localStorage.setItem("user", user.token);
                window.location = "."
                break;
            case 401:
                ajoutDomErorPw();
                break;
            case 404:
                ajoutDomErorMail();

            default:
                console.log(`An error occured during login form submission`);
        }

    });

}

ajoutListenerConnexion();


function ajoutDomErorPw(){
    const mailError = document.querySelector("#mail");
    const msg = document.createElement("p");
    msg.innerText = "Email incorrect"
    mailError.insertAdjacentElement(afterend, msg)

};

function ajoutDomErorMail(){
    const passwordError = document.querySelector("#password");
    const msg = document.createElement("p");
    msg.innerText = "Mot de passe incorrect"
    passwordError.insertAdjacentElement(afterend, msg)

};

function rm_tag(){
    //cette fº enleve les p av msg err
    let Error = document.querySelector("p");
    if (Error) {
        Error.remove();
    }
}

// console.log("reponse.status =", reponse);
// if (reponse.status === 200) {
//     // Récupération des user depuis l'API
//     let user = await reponse.json();
//     // Stockage des informations dans le localStorage
//     window.localStorage.setItem("token", user.token);
//
//
// }
// let test = window.localStorage.getItem("token");
//
//
// console.log(test);