// Récupération des visites depuis le fichier JSON
const reponse = await fetch('http://localhost:5678/api/works');
const visits = await reponse.json();

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


//2 sets are created with cat id&names
let categories = visits.map(visit => visit.category.id);
// console.log(categories)
let uniqueCategories = new Set(categories);
// console.log(uniqueCategories)

let categories_name = visits.map(visit => visit.category.name);
let uniqueCategories_name = new Set(categories_name);
console.log(uniqueCategories_name);



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
// const boutonFiltrer = document.getElementById("1");
// boutonFiltrer.addEventListener("click", function () {
//     const visitsFiltrees = copyArray.filter(function (visit) {
//         return visit.category.id != 1;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     genererVisits(visitsFiltrees);
//     console.log(visitsFiltrees);
// });
//
// const boutonFiltrer0 = document.getElementById("2");
// boutonFiltrer0.addEventListener("click", function () {
//     const visitsFiltrees = copyArray.filter(function (visit) {
//         return visit.category.id !== 2;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     genererVisits(visitsFiltrees);
//     console.log(visitsFiltrees)
//
// });
//
// const boutonFiltrer1 = document.getElementById("3");
// boutonFiltrer1.addEventListener("click", function () {
//     const visitsFiltrees = copyArray.filter(function (visit) {
//         return visit.category.id !== 3;
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     genererVisits(visitsFiltrees);
//     console.log(visitsFiltrees)
//
// });
// console.log(uniqueCategories.size)
//
