
// Récupération des visites depuis l'api

let visits = await recupFichierVisitsApi()


async function recupFichierVisitsApi() {
    //function used to refresh data during upload
    // Récupération des visites depuis l'api
    let reponse = await fetch('http://localhost:5678/api/works');
    return  await reponse.json()
    
}

function genererVisits(visits){
    visits.forEach((visit) => {
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGallery = document.getElementById("gallery");
        // Création d’une balise dédiée à une visite av id
        const visitElement = document.createElement("figure");
        visitElement.id = visit.id
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

function rm_buttonColorGreen(){
    //cette fº enleve les msg err
    let green = document.querySelector(".green");
    if (green) {
        green.classList.remove("green")
    }
}

// Récupération de l'élément du DOM qui accueillera les boutons
const sectionFiches = document.getElementById("visits_filter");

//bouton ajouté
const visitShowAll = document.createElement("button");
visitShowAll.textContent = "Tous";
visitShowAll.classList.add("green")  //add green class on load so the button is selected

// On rattache la balise button a la section visits_filter
sectionFiches.appendChild(visitShowAll).addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererVisits(visits);
    //on click rm all green and add ot current button green class
    rm_buttonColorGreen()
    visitShowAll.classList.add("green")
});


//on va chercher les categories dans l'api
let categoriesResponse = await fetch("http://localhost:5678/api/categories", {
    method: "GET",
    headers: {
        accept: 'application/json'
    },
});
let categories = await categoriesResponse.json();

categories.forEach((category) => {

    let filterButton = document.createElement("button");
    filterButton.textContent = category.name;
    filterButton.addEventListener("click", function () {
        rm_buttonColorGreen()
        filterButton.classList.add("green")
        const visitsFiltrees = copyArray.filter(function (visit) {
            return visit.category.id === category.id;
        });
        document.querySelector(".gallery").innerHTML = "";//suppr tt
        genererVisits(visitsFiltrees);
    });
    // On rattache la balise button a la section visits_filter
    sectionFiches.appendChild(filterButton);

});


let copyArray = visits.slice(0)


//mode editeur
let loggedIn = window.localStorage.getItem('token');


if (loggedIn === null){
}else if (loggedIn != null){
    ajoutLogOut()
    ajoutDomEditor()
    ajoutDomBand()
}else  {

}
function ajoutLogOut(){
    let logIn =  document.querySelector("#login");
    logIn.href = ""
    logIn.innerHTML = "logout"
    logIn.addEventListener("click", function () {
        window.localStorage.removeItem('token');
        window.location = ".";
    });


}
function ajoutDomEditor(){
    //add envent listener and button to show the modale editor
    const titleH2 = document.querySelector(".three");
    const link = document.querySelector(".three");
    const modifier = document.createElement("a");
    modifier.innerText = "modifier";
    modifier.addEventListener("click", function () {
        if (document.querySelector(".editor_modale") === null){
        afficherEditeur();} //cree editeur
        else {
            document.querySelector(".editor_modale").style.display = ""; //afficher editeur
            document.querySelector(".editor_modale").style.visibility = "visible";

        }
        });
    let editorSquare =  document.createElement("i");
    editorSquare.classList.add('fa-regular', 'fa-pen-to-square');
    titleH2.insertAdjacentElement("afterbegin", modifier)
    link.querySelectorAll(":scope > a");
    modifier.insertAdjacentElement("afterbegin", editorSquare)

}
function ajoutDomBand(){
    const body = document.querySelector("body");
    body.classList.add('push_body');
    const banner = document.querySelector(".edit_banner");
    banner.style.display = '';
}
function afficherEditeur(){
    //creates transparent cover 100% screen
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
    afficherGalleryInsideModale(visits)
}


function afficherTitre(){
    const modifier = document.createElement("h3");
    modifier.classList.add('title_h3');
    modifier.innerHTML = "Gallerie photo"
    const editeur = document.querySelector(".fa-xmark");
    editeur.insertAdjacentElement("afterend", modifier)
}

 function afficherBoutonX(){
    //    X bouton fermer modale X was added x
    const xmark = document.createElement("i");
    xmark.classList.add('fa-solid', 'fa-xmark');

    xmark.addEventListener("click", async function () {
        await recupFichierVisitsApi()
        document.querySelector(".editor_modale").style.visibility = "hidden";
    });
    const editeur = document.querySelector(".modale");
    editeur.insertAdjacentElement("afterbegin", xmark)

}

function delPhoto(visitElement, id){
    //
    //ajout btn suppr foreach img
    const basket = document.createElement("i");
    basket.classList.add('fa-solid', 'fa-trash-can');


    visitElement.appendChild(basket)
    basket.addEventListener("click", async function () {
        document.getElementById(id).remove()
        visitElement.remove();//suppr img
        await fetch('http://localhost:5678/api/works/' + id, {
            headers: {
                Authorization: 'Bearer ' + loggedIn },
            method: 'DELETE'
        })

    });



}

function afficherGalleryInsideModale(visits){

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
    modifier.addEventListener("click",  function () {
        document.querySelector(".title_h3").innerHTML = "Ajout photo";
        document.querySelector(".imgs").innerHTML = "";
        modifier.remove()
        deleteBr()
        genererForm();
        ajouterModaleBtnRetour()
    });
    const editeur = document.querySelector(".modale");
    editeur.insertAdjacentElement("beforeend", modifier)
}

function insertAfter(referenceNode, newNode) {
    referenceNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addErrorFieldForm (field, input, id){
    //here field is actually form but error must be added after input so it's called field
    let erreur = document.createElement("p");
    erreur.classList.add("erreurInputVide")
    erreur.id = id
    erreur.innerHTML = "Veuillez ajouter l'element : " + input
      field.appendChild(erreur)
}
function genererForm(){
    const form = document.createElement("form"); //bouton upload img
    form.id = "uploadPhotoCategory"
    const container =document.querySelector(".imgs")
    container.id = "container_form";
    container.appendChild(form)
    uploadField(form)

    let lTitre = document.createElement("label");

    lTitre.innerHTML = "Titre";
    const tInput = document.createElement("input")

    tInput.name = "titre"
    tInput.classList.add("upload")
    tInput.type = "text"
    form.appendChild(lTitre)
    form.appendChild(tInput)
    addErrorFieldForm (form, "titre", 1)

    const lCategorie = document.createElement("label");
    lCategorie.innerHTML = "Categorie";

    const cInput = document.createElement("select")
    cInput.classList.add("upload")

    categoriesForm(cInput)
    cInput.name = "categorie"

    form.appendChild(lCategorie)
    form.appendChild(cInput)
    addErrorFieldForm (form, "categorie", 2)

    const modifier = document.createElement("div");
    modifier.classList.add('br');
    form.appendChild(modifier)
    let containerButton = document.createElement("div"); //error_hit_box
    containerButton.id = "error_hit_box"
    let valider = document.createElement("button")
    valider.type = "button"
    valider.id = "cofirmerUploadForm"
    valider.innerHTML = "Valider"
    valider.disabled = true
    valider.classList.add('disabled')
    valider.value = "Valider"
    containerButton.appendChild(valider)
    form.appendChild(containerButton)
    ajoutListenerUpload()
    addHitBoxLitener()

}

function uploadField(form) {
    const container = document.createElement("div"); //bouton upload img
    container.id = "inputUploadField"
    const imgIcon = document.createElement("i"); //ajout icone img
    imgIcon.classList.add('fa-regular', 'fa-image');
    const uploadPhoto = document.createElement("input"); //bouton upload img
    addErrorFieldForm (uploadPhoto)

    uploadPhoto.classList.add('upload');
    uploadPhoto.type = 'file'
    uploadPhoto.name = 'image'
    uploadPhoto.id = 'myPhoto'

    container.appendChild(imgIcon)

    form.appendChild(uploadPhoto)
    const buttonUpload = document.createElement("input"); //bouton upload img
    buttonUpload.type = 'button'
    buttonUpload.value = '+ Ajouter photo'
    buttonUpload.addEventListener("click",  function () {
        uploadPhoto.click();
    });

    container.appendChild(buttonUpload)
    form.appendChild(container)
    addErrorFieldForm (form, "image", 0)

    showPreviewUploadedPhoto()
    const imgTypesAccept = document.createElement("p"); //bouton upload img
    imgTypesAccept.innerHTML = "jpg, png: 4mo max";
    container.appendChild(imgTypesAccept)

}

function ajoutListenerUpload() {

    // ajouter le id
    let cofirmerUploadForm = document.getElementById("cofirmerUploadForm")
    cofirmerUploadForm.addEventListener("click", async function (event) {

        event.preventDefault();

        const uploadFormVisit = document.getElementById("uploadPhotoCategory")
        const title = uploadFormVisit.querySelector("[name=titre]").value
        const category = uploadFormVisit.querySelector("[name=categorie]").value
        const image = uploadFormVisit.querySelector("[name=image]").files[0]
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
                },
            body: visitData

        });
        


        switch (reponse.status) {
            case 201:
                // Récupération des visit depuis l'API
                visits = await recupFichierVisitsApi()
                //this part is responsible for updating gallery n modale gallery pics
                document.getElementById("gallery").innerHTML = ""
                afficherModale() //modale mise a jour
                document.querySelector(".editor_modale").remove()

                genererVisits(visits);
                break;

        }
    });

}



async function categoriesForm(cInput){ //function used for debug, wrong it's used for getting categories from api
    let reponse = await fetch("http://localhost:5678/api/categories", {
        method: "GET",
        headers: {
            accept: 'application/json'
        },
    });
    let categories = await reponse.json();
    addCategoriesForm(cInput, categories)
}

function addCategoriesForm(cInput, categories){
    const categori = document.createElement("option");
    categori.value= ""
    cInput.appendChild(categori);
    categories.forEach((category) => {

        // Création d’une balise dédiée à une categorie
        const categori = document.createElement("option");
        categori.value = category.id;
        categori.innerText = category.name;

        // On rattache la balise option a la section select
        cInput.appendChild(categori);
    });
    //ajout caret
    const caret = document.createElement("i");
    caret.classList.add('fa-solid', 'fa-angle-down')
    cInput.appendChild(caret);

}
// categories_form()

function showPreviewUploadedPhoto(){
    let uploadFieldSelector = document.getElementById("inputUploadField")
    const img = document.createElement("img");

    document.getElementById('myPhoto').onchange = function () {
        uploadFieldSelector.innerHTML = ""
        uploadFieldSelector.appendChild(img)
        img.src = URL.createObjectURL(this.files[0])
    }
}

function ajouterModaleBtnRetour(){
    const modale = document.querySelector('.modale');
    const retour = document.createElement("i");
    retour.id = 'modaleRetourArriere'
    retour.classList.add('fa-solid', 'fa-arrow-left')
    retour.addEventListener("click", function () {
        document.querySelector('.editor_modale').remove()
        const click = document.querySelector('.three a');
        click.click();

    });
    modale.appendChild(retour)
    checkIfInputEmpty()
}

let counter = 0
let whichInput = ""

    function checkIfInputEmpty(){ //check If Input Empty in all input fields


    // Get fields by className
    let fields = document.getElementsByClassName("upload") //validated-field

// Array.from will convert the HTMLCollection to Native Array.
    let nbInputFields = Array.from(fields).length
    if (nbInputFields > 0) {
        // Loop
        Array.from(fields).forEach((field, index ) => {
            // Add Event for each field.
            field.addEventListener("input", function(e) {
                let test = document.getElementById(index.toString())
                let isValid

                if (!e.target.value) {
                    buttonInvalid()
                    whichInput = field.name
                    test.classList.add("not-valid")
                    field.classList.remove("valid")

                    isValid = false
                    compteNbFieldOk( nbInputFields, isValid)

                } else {
                    isValid = true
                    test.classList.remove("not-valid")
                    field.classList.add("valid")

                    compteNbFieldOk( nbInputFields, isValid)
                    compteNbClassValid(nbInputFields)

                }

                return counter

            })
        })
    }
}
let previousBool = true

function compteNbFieldOk( nbInputFields, isValid ) {

    if (isValid ) {
        if (previousState(isValid, previousBool)){
            previousBool = false
            counter += 1
        }


    }
    else if (previousState(isValid, previousBool)) {
        counter -= 1
        previousBool = true
    }

    if (counter === nbInputFields) {
        buttonValid()
    }
    else {
        buttonInvalid()
    }
    // return counter
}

function previousState(s1, s2) {
    //this function check if previous state is different
    return s1 === s2
}
function buttonInvalid() {
    let mybutton = document.getElementById('cofirmerUploadForm')
    mybutton.disabled = true
    mybutton.classList.add("disabled")
}


function buttonValid() {
    let mybutton = document.getElementById('cofirmerUploadForm')
    mybutton.disabled = false;
    mybutton.classList.remove("disabled")

}

function compteNbClassValid(nbInputFields) {
    let validClasses= document.getElementsByClassName("valid")
    let nbClassValid = Array.from(validClasses).length
    if (nbInputFields === nbClassValid) {
        let mybutton = document.getElementById('cofirmerUploadForm')
        mybutton.disabled = false;
        mybutton.classList.remove("disabled")
    }
}


function addHitBoxLitener(){
let myButtonHitBox = document.getElementById('error_hit_box')
    myButtonHitBox.addEventListener("click", function () {
    let fields = document.getElementsByClassName("upload") //validated-field
    let nbInputFields = Array.from(fields).length
        if (nbInputFields > 0) {
            // Loop
            Array.from(fields).forEach((field, index )=> {
                    if (!field.value) {
                        let test = document.getElementById(index.toString())
                        test.classList.add("not-valid")
                    } else {

                    }
            })
        }
    });

}


function cleck(){ //function used for debug
    const link = document.querySelector('.three a');
        link.click();
    const link2 = document.querySelector('.ajouter');
     link2.click();

}
