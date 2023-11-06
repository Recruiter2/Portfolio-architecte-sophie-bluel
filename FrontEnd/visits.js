// Récupération des visites depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const visits = await reponse.json();
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
}else if (loggedIn){
    ajoutDomEditor()
}else  {
    console.log("erreur_verif_loggedin", loggedIn.token)

}
function ajoutDomEditor (){
    const titleH2 = document.querySelector(".three");
    const link = document.querySelector(".three");
    const modifier = document.createElement("a");
    modifier.innerText = " modifier";
    modifier.addEventListener("click", function () {
        // console.log("clicked");
        afficherEditeur();
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
        document.querySelector(".editor_modale").remove();//suppr tt
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

}

function afficherBr(){
    const modifier = document.createElement("br");
    // modifier.classList.add('modale');
    const editeur = document.querySelector(".modale");
    editeur.insertAdjacentElement("afterend", modifier)
}


function ajouterPhoto(){
    const modifier = document.createElement("button");
    modifier.classList.add('modale');
    modifier.addEventListener("click", async function () {
        document.querySelector(".gallery").innerHTML = "";
        genererVisits(visits);
    });
    const editeur = document.querySelector("br");
    editeur.insertAdjacentElement("afterend", modifier)
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
        delPhoto_db(id)
    });

}

function delPhoto_db(id) {

}

function cleck(){
    let link = document.querySelector('.three a');
    // for(var i = 0; i < 50; i++)
        link.click();
}
cleck()