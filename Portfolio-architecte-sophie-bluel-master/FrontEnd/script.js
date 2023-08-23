const Url = "http://localhost:5678/api/";
const all = document.querySelector(".all_button");
const postsContainer = document.querySelector(".gallery");
const filterContainer = document.querySelector(".filter");
const editionGallery = document.querySelectorAll(".edition_mode");

let postsData = "";
let filterData = "";

async function fetchWorks() {
  const response = await fetch(Url + "works");
  postsData = await response.json();
  postsData.map((post) => GenerateGallery(post));
  filterData = [
    ...new Set(
      postsData
        .map((post) => post.category.name)
    )
  ];
  console.log(filterData);
  filterData.map((filter) => GenerateButtonFilter(filter));
};
editionModeActive()
fetchWorks().catch(error => {
  error.message; // 'An error has occurred: 404'
});

const GenerateGallery = (postData) => {
  const { title, imageUrl, category } = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `<img class="post-image" src="${imageUrl}"><div class="post-content">
        <p class="post-title">${title}</p>
      </div>
  `;
  postsContainer.append(post);
};

const GenerateButtonFilter = (filter) => {
  const filterButton = document.createElement("button");
  filterButton.className = "filter_button";
  filterButton.innerText = filter;
  filterButton.setAttribute('data-state', 'inactive');
  filterButton.addEventListener("click", (e) =>
    handleButtonClick(e, filter)
  );

  filterContainer.append(filterButton);
};

const resetFilterButtons = (currentButton) => {
  const filterButtons = document.querySelectorAll('.filter_button');
  [...filterButtons].map(button => {
    if (button != currentButton) {
      button.classList.remove('is-active');
      button.setAttribute('data-state', 'inactive')
    }
  })
}

const handleButtonClick = (e, param) => {
  const button = e.target;
  const buttonState = button.getAttribute('data-state');
  resetFilterButtons(button);

  function event_handler(event) {
    all.classList.add('is-active-all');
    button.classList.remove('is-active');
    button.setAttribute('data-state', 'inactive')
    resetGallery()
    console.log(event);
  }
  // Assign the listener callback to a variable
  var doClick = (event) => event_handler(event);  
  all.addEventListener('click', doClick);

  console.log(button)
  if (buttonState =='inactive') {
    button.classList.add('is-active');
    button.setAttribute('data-state', 'active');
    all.classList.remove('is-active-all');
    handleFilterGallery(param)
  } else {
    button.classList.remove('is-active');
    button.setAttribute('data-state', 'inactive')
    resetGallery()
  } 
}
const handleFilterGallery = (param) => {
  let filteredPosts = [...postsData].filter(post => post.category.name == param);
  
  
  postsContainer.innerHTML = "";
  filteredPosts.map(post => GenerateGallery(post))
};

const resetGallery = () => {
  postsContainer.innerHTML = "";
  postsData.map((post) => GenerateGallery(post));
};

// ----------- EditionMode -------------

function editionModeActive () {
  const token = window.localStorage.getItem('token')
  if (token) {
    const bandeau = document.querySelector(".bandeau")
    bandeau.style.display = "flex"
    const editbutton = document.querySelectorAll("#active")
    editbutton.forEach((userItem) => {
      userItem.style.display = "inline-flex"
    });
  }
};

editionGallery.forEach(el=>el.addEventListener("click", customGallery));

function customGallery (){
 const modale = document.querySelector(".modal-container")
 modale.style.display = "block"
fetchGallery().catch(error => {
  error.message; // 'An error has occurred: 404'
});
console.log("test")
};

const galleryCustom = document.querySelector(".custom_gallery");

async function fetchGallery() {
  const response = await fetch(Url + "works");
  postsData = await response.json();
  postsData.map((post) => {
  const { id, title, imageUrl, category } = post;
  const gallery = document.createElement("div");
  gallery.className = "gallery_post";
  gallery.innerHTML = `<div><div class="gallery_edit"><img class="gallery_image" src="${imageUrl}">
  <div class="gallery_edit_content">
  <div class="delete_button" id="${id}"><i class="fa-regular fa-trash-can"></i></div>
  </div>
  </div>
        <p class="post-title">Editer</p>
        </div>
  `;
  galleryCustom.append(gallery);
});
const iconDelete = document.querySelectorAll(".delete_button");

  console.log(iconDelete[0].id)
  iconDelete.forEach(element => element.addEventListener("click", (event) => {
    const iconeElement = event.currentTarget.id;
    console.log(`DeleteWorks ${iconeElement}`);
    // DeleteWorks(iconeElement)
    event.stopPropagation();
  }));

};

function DeleteWorks(id) {
let monToken = localStorage.getItem("token");
fetch(Url + `works/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${monToken}`,
        },
}).then(response => {
  if (response.status === 204) {
    console.log("DEBUG SUPPRESION DU PROJET " + this.classList[0])
    window.location.href = "login.html";
}
// Token incorrect
else if (response.status === 401) {
    alert("Vous n'êtes pas autorisé à supprimer ce projet, merci de vous connecter avec un compte valide")
    window.location.href = "login.html";
}
})
.catch(error => {
  console.log(error);
})
}

const addWorks = document.querySelector(".add_works");

addWorks.addEventListener("click", addNewWorks)

function addNewWorks() {
  const modalgallery = document.querySelector(".modal")
  modalgallery.style.display = "none"
  const modalAddNewWorks = document.querySelector(".modal_2")
  modalAddNewWorks.style.display = "block"
  fetchCategory()
  console.log("addNewWorks");
}

const backModale = document.querySelector(".back_modale");
const closeModale = document.querySelectorAll(".close_modale");

backModale.addEventListener("click", backModal);
closeModale.forEach(element => element.addEventListener("click", closedModal));

function backModal() {
  const modalgallery = document.querySelector(".modal")
  modalgallery.style.display = "block"
  const modalAddNewWorks = document.querySelector(".modal_2")
  modalAddNewWorks.style.display = "none"
};
function closedModal() {
  const modale = document.querySelector(".modal-container")
  modale.style.display = "none"
  galleryCustom.innerHTML = "";
  const modalgallery = document.querySelector(".modal")
  modalgallery.style.display = "block"
  const modalAddNewWorks = document.querySelector(".modal_2")
  modalAddNewWorks.style.display = "none"
};

 // L'image img#image
 const image = document.getElementById("image");
 const imageUpload = document.querySelector(".image-upload");
     
 // La fonction previewPicture
 const previewPicture  = function (e) {

     // e.files contient un objet FileList
     const [picture] = e.files
      // Les types de fichier autorisés
    var types = [ "image/jpg", "image/jpeg", "image/png" ];

    // Vérification si "picture.type" se trouve dans "types"
    if (types.includes(picture.type)) {
        // On affiche l'image sur la page ...
    }

     // "picture" est un objet File
     if (picture) {

         // L'objet FileReader
         var reader = new FileReader();

         // L'événement déclenché lorsque la lecture est complète
         reader.onload = function (e) {
             // On change l'URL de l'image (base64)
             image.src = e.target.result
             image.style.display = "inline-block"
             imageUpload.style.display = "none"
         }

         // On lit le fichier "picture" uploadé
         reader.readAsDataURL(picture)
     }
 } 

async function  fetchCategory() {
  const response = await fetch(Url + "categories");
  postsData = await response.json();
  filterData = [
    ...new Set(
      postsData
        .map((post) => post)
    )
  ];
  console.log(filterData);
  const selectCategory = document.querySelector("#categorie");
  selectCategory.innerHTML = filterData.map(item =>`<option value="${item.id}">${item.name}</option>`);
  console.log(selectCategory)
};

const form = document.querySelector(".js-add-work");
form.addEventListener("click", PostWorks)

async function PostWorks() {

  console.log("postWork")

    const Titleform = document.querySelector("#title");
    const Categorieform = document.querySelector("#categorie");
    const imagefile = document.getElementById("fileToUpload").files[0]; //the File Upload input
    if (Titleform.value === "" || Categorieform.value === "" || imagefile === undefined) {
      alert("Merci de remplir tous les champs");
      return;
  } else if (Categorieform.value !== "1" && Categorieform.value !== "2" && Categorieform.value !== "3") {
      alert("Merci de choisir une catégorie valide");
      return;
      } else {
  try {
    const formData = new FormData();
    formData.append("title", Titleform.value);
    formData.append("imageUrl", imagefile);
    formData.append("categoryId", Categorieform.value);

  console.log("fonctionne" + formData)

let monToken = localStorage.getItem("token");

const response = await fetch(Url + "works", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${monToken}`,
  },
  body: formData
});
  if (response.status === 201) {
  alert("Projet ajouté avec succès :)");
  closedModal();
  fetchWorks().catch(error => {
    error.message; // 'An error has occurred: 404'
  });
  } else if (response.status === 400) {
    alert("Merci de remplir tous les champs");
  } else if (response.status === 500) {
      alert("Erreur serveur");
  } else if (response.status === 401) {
      alert("Vous n'êtes pas autorisé à ajouter un projet");
      window.location.href = "login.html";
  } else if (response.status === 405) {
      alert("Cette action ne fonctionne pas");
      window.location.href = "index.html";
  }
}
catch(error) {
  console.log(error);
}}
}

