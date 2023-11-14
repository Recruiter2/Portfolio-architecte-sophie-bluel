
// Récupération des visites depuis le fichier JSON
let reponse = await fetch('http://localhost:5678/api/works');
let visits = await reponse.json()
// window.localStorage.setItem("visits", JSON.stringify(visits));
//
//  visits =   window.localStorage.getItem('visits')
// let visits = JSON.parse(visits);
//
// console.log(visits)

function genererVisits(visits){
    visits.forEach((visit) => {
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGallery = document.getElementById("gallery");
        // Création d’une balise dédiée à une pièce
        const visitElement = document.createElement("figure");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = visit.imageUrl;
        const captionElement = document.createElement("figcaption");
        captionElement.innerText = visit.title;

        // On rattache la balise article a la section Fiches
        sectionGallery.appendChild(visitElement);
        visitElement.appendChild(imageElement);
        visitElement.appendChild(captionElement);
    });
}

genererVisits(visits);

// Récupération de l'élément du DOM qui accueillera les boutons
const sectionFiches = document.getElementById("visits_filter");

//bouton ajouté
const visitShowAll = document.createElement("button");
visitShowAll.textContent = "Tous";

// On rattache la balise button a la section visits_filter
sectionFiches.appendChild(visitShowAll).addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererVisits(visits);
});


// on cree des clefs unique pour les categories
//2 sets are created with cat id&names
let categories = visits.map(visit => visit.category.id);
// console.log(categories)
let uniqueCategories = new Set(categories);
// console.log(uniqueCategories)

let categories_name = visits.map(visit => visit.category.name);
let uniqueCategories_name = new Set(categories_name);
// console.log(uniqueCategories_name);


//on itere sur les cler uniques on cree un bouton par clef et on leur ajoute a chaqu'un un listener
//le listener une fois enclanche va suppr tt et ajoute uniquement les visites de la categori concerne   amelioration possible .forEach((visit, index) foreach av un index
for(let i = 0; i < uniqueCategories.size; i++){
    let filterButton = document.createElement("button");
    filterButton.textContent = Array.from(uniqueCategories_name)[i];
    filterButton.addEventListener("click", function () {
        const visitsFiltrees = copyArray.filter(function (visit) {
            return visit.category.id === Array.from(uniqueCategories)[i];
        });
        document.querySelector(".gallery").innerHTML = "";//suppr tt
        genererVisits(visitsFiltrees);
    });
    // On rattache la balise button a la section visits_filter
    sectionFiches.appendChild(filterButton);
}

let copyArray = visits.slice(0)


//mode editeur
let loggedIn = window.localStorage.getItem('token');
// console.log("b4", loggedIn)


if (loggedIn === null){
    console.log("pas connecte")
}else if (loggedIn != null){
    ajoutLogOut()
    ajoutDomEditor()
    // console.log("1erreur_verif_loggedin", loggedIn)
}else  {
    // console.log("2erreur_verif_loggedin", loggedIn.token)

}
function ajoutLogOut (){
    let logIn =  document.querySelector("#login");
    logIn.href = ""
    logIn.innerHTML = "LogOut"
    logIn.addEventListener("click", function () {
        window.localStorage.removeItem('token');
        // delete(loggedIn)
        // loggedIn = null;
        window.location = ".";
    });


}
function ajoutDomEditor (){
    const titleH2 = document.querySelector(".three");
    const link = document.querySelector(".three");
    const modifier = document.createElement("a");
    modifier.innerText = " modifier";
    modifier.addEventListener("click", function () {
        // console.log(document.querySelector(".modale"));
        if (document.querySelector(".editor_modale") === null){
        afficherEditeur();} //cree editeur
        else {
            document.querySelector(".editor_modale").style.display = ""; //afficher editeur

        }
        });
    // modifier.href = ""
    let editorSquare =  document.createElement("i");
    editorSquare.classList.add('fa-regular', 'fa-pen-to-square');
        // "< i className = \"fa-regular fa-pen-to-square\" > < /i>";
    titleH2.insertAdjacentElement("afterbegin", modifier)
    link.querySelectorAll(":scope > a");
    // console.log(link)
    modifier.insertAdjacentElement("afterbegin", editorSquare)

}
function afficherEditeur(){
    const modifier = document.createElement("div");
    modifier.classList.add('editor_modale');
    const body = document.querySelector("body");
    body.insertAdjacentElement("afterbegin", modifier)
    afficherModale()

}

function afficherModale(){
    const modale = document.createElement("div");
    modale.classList.add('modale');
    const editeur = document.querySelector(".editor_modale");
    editeur.appendChild(modale)
    afficherBoutonX()
    afficherTitre()

    const photosContainer = document.createElement("div");
    photosContainer.classList.add('photos');

    afficherGallery(visits)
}


function afficherTitre(){
    console.log('t')

    const modifier = document.createElement("h3");
    modifier.classList.add('title_h3');
    modifier.innerHTML = "Gallerie photo"
    const editeur = document.querySelector(".fa-xmark");

    editeur.insertAdjacentElement("afterend", modifier)


}

function afficherBoutonX(){
    //X bouton fermer modale X
    console.log('x')
    const xmark = document.createElement("i");
    xmark.classList.add('fa-solid', 'fa-xmark');

    xmark.addEventListener("click", function () {
        document.querySelector(".editor_modale").style.display = "none";//suppr tt
    });
    const editeur = document.querySelector(".modale");
    editeur.insertAdjacentElement("afterbegin", xmark)

}

function afficherGallery(visits){
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector(".modale");
    //inside modale
    const imgs = document.createElement("div");
    imgs.classList.add('imgs');
    visits.forEach((visit) => {
        // Création d’une balise dédiée à une pièce
        const visitElement = document.createElement("figure");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = visit.imageUrl;
        visitElement.appendChild(imageElement);
        let id = visit.id;
        delPhoto(visitElement, id);
        // On rattache la balise figure au conteneur imgs
        imgs.appendChild(visitElement)

    });
    sectionGallery.appendChild(imgs)
    afficherBr()
    afficherButtonAjouter()

}

function afficherBr(){
    const modifier = document.createElement("div");
    modifier.classList.add('br');
    const editeur = document.querySelector(".modale");
    editeur.insertAdjacentElement("beforeend", modifier)
}
function deleteBr(){
    document.querySelector(".br").remove()
}
function afficherButtonAjouter(){
    const modifier = document.createElement("button");
    modifier.classList.add('ajouter');
    modifier.innerHTML = "Ajouter une photo";
    modifier.addEventListener("click", async function () {
        document.querySelector(".title_h3").innerHTML = "Ajout photo";
        document.querySelector(".imgs").innerHTML = "";
        modifier.remove()
        deleteBr()
        genererForm();
    });
    const editeur = document.querySelector(".modale");
    editeur.insertAdjacentElement("beforeend", modifier)
}

function genererForm(){
    const form = document.createElement("form"); //bouton upload img
    const container =document.querySelector(".imgs")
    container.id = "concact";
    container.appendChild(form)
    uploadField(form)


    let lTitre = document.createElement("label");
    lTitre.innerHTML = "Titre";

    const tInput = document.createElement("input")
    tInput.name = "titre"
    tInput.type = "text"

    form.appendChild(lTitre)
    form.appendChild(tInput)
    const lCategorie = document.createElement("label");
    lCategorie.innerHTML = "Categorie";

    const cInput = document.createElement("input")
    cInput.name = "categorie"
    cInput.type = "integer"

    form.appendChild(lCategorie)
    form.appendChild(cInput)
    const modifier = document.createElement("div");
    modifier.classList.add('br');
    form.appendChild(modifier)
    const valider = document.createElement("input")
    valider.type = "submit"
    valider.value = "Valider"
    form.appendChild(valider)

    // modifier.classList.add('modale');
    // modifier.addEventListener("click", async function () {
    //     document.querySelector(".gallery").innerHTML = "";
    //     genererVisits(visits);
    // });
    // const editeur = document.querySelector("br");
    // editeur.insertAdjacentElement("afterend", modifier)
}

function uploadField(form) {
    const modifier = document.createElement("input"); //bouton upload img
    modifier.classList.add('upload');
    modifier.type = 'file'
    modifier.name = 'image'
    modifier.id = 'myPhoto'
    // modifier.innerHTML = "+ Ajouter photo";
    form.appendChild(modifier)
    ajoutListenerUpload(form)

}

function ajoutListenerUpload(form) {
    form.addEventListener("submit", async function (event) {
        console.log('event listener was triggered')
        // rm_tag();
        event.preventDefault();
        // Création de l’objet du nouvel user.


        const title = event.target.querySelector("[name=titre]").value
        const category = event.target.querySelector("[name=categorie]").value
        const image = event.target.querySelector("[name=image]").files[0]
        const visitData = new FormData();
        visitData.append("title", title);
        visitData.append("category", category); // le numéro 123456 est converti immédiatement en chaîne "123456"

// fichier HTML choisi par l'utilisateur
        visitData.append("image", image);
        // Création de la charge utile au format JSON
        // const chargeUtile = JSON.stringify(user_input);
        // Appel de la fonction fetch avec toutes les informations nécessaires
        const reponse = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'accept': 'application/json',
                Authorization: 'Bearer ' + loggedIn
                // "Content-Type": "multipart/form-data"
                },
            body: visitData


        });
        // console.log(reponse, visitData)
        //

        //  console.log("reponse.status =", reponse);
        // let user = await reponse.clone();
        //  console.log(reponse.status)

        switch (reponse.status) {
            case 201:
                // Récupération des user depuis l'API
                // let upload = await reponse.json();
                // console.log(user.token)
                // Stockage des informations dans le localStorage
                // window.localStorage.setItem("token", user.token);
                // window.location = "."
                // let avis = window.localStorage.getItem('token');
                // console.log(upload)
                //this part is responsible for updating gallery n modale gallery pics
                document.getElementById("gallery").innerHTML = ""

                const reponse = await fetch('http://localhost:5678/api/works');
                let visits = await reponse.json()
                //window.localStorage.setItem("visits", JSON.stringify(visits));

                // visits =   window.localStorage.getItem('visits')
                // visits = JSON.parse(visits);
                afficherGallery(visits)
                document.querySelector(".imgs").innerHTML = ""
                document.querySelector(".editor_modale").style.display = "none";

                genererVisits(visits);

                break;
            case 400:
                // ajoutDomErorPw();
                break;
            case 401:
                // ajoutDomErorPw();
                break;
            case 404://doesn't exist
                // ajoutDomErorMail();
                break;
            default: //500
                console.log(`An error occured during upload form submission or not...`);
        }
        console.log('event listener ended')
});

}


function delPhoto(visitElement, id){
    //ajout btn suppr foreach img
    const basket = document.createElement("i");
    basket.classList.add('fa-solid', 'fa-trash-can');


    visitElement.appendChild(basket)
    basket.addEventListener("click", async function () {
        visitElement.remove();//suppr img
        // const user_input = {
        //     Authorization:  loggedIn
        // };
        // fetch('http://localhost:5678/api/', {
        //     method: "POST",
        //     headers: {Authorization: 'Bearer' + loggedIn }
        // })
        fetch('http://localhost:5678/api/works/' + id, {
            headers: {
                Authorization: 'Bearer ' + loggedIn },
            method: 'DELETE'
        })
        // const avis = await reponse.json();
    });

}



function cleck(){ //function used for debug
    let link = document.querySelector('.three a');
    // for(var i = 0; i < 50; i++)
        link.click();
}
// cleck()