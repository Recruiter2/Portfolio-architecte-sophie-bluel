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
        document.querySelector(".gallery").innerHTML = "";
        genererVisits(visitsFiltrees);
    });
    // On rattache la balise button a la section visits_filter
    sectionFiches.appendChild(filterButton);
}

let copyArray = visits.slice(0)
