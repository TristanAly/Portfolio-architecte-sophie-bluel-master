const Url = "http://localhost:5678/api/";
const all = document.querySelector(".all_button");
const postsContainer = document.querySelector(".gallery");
const filterContainer = document.querySelector(".filter");
const editionGallery = document.querySelectorAll("#active");
const galleryCustom = document.querySelector(".custom_gallery");
const addWorks = document.querySelector(".add_works");
const modale = document.querySelector(".modal-container");
const modalgallery = document.querySelector(".modal");
const modalAddNewWorks = document.querySelector(".modal_2");
const backModale = document.querySelector(".back_modale");
const closeModale = document.querySelectorAll(".close_modale");

let postsData = "";
let filterData = "";

async function fetchWorks() {
  const response = await fetch(Url + "works");
  postsData = await response.json();
  postsData.map((post) => GenerateGallery(post));
  filterData = [...new Set(postsData.map((post) => post.category.name))];
  console.log(filterData);
  filterData.map((filter) => GenerateButtonFilter(filter));
  fetchGallery(postsData);
}
editionModeActive();
fetchWorks().catch((error) => {
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
  filterButton.setAttribute("data-state", "inactive");
  filterButton.addEventListener("click", (e) => handleButtonClick(e, filter));

  filterContainer.append(filterButton);
};

const resetFilterButtons = (currentButton) => {
  const filterButtons = document.querySelectorAll(".filter_button");
  [...filterButtons].map((button) => {
    if (button != currentButton) {
      button.classList.remove("is-active");
      button.setAttribute("data-state", "inactive");
    }
  });
};

const handleButtonClick = (e, param) => {
  const button = e.target;
  const buttonState = button.getAttribute("data-state");
  resetFilterButtons(button);

  function event_handler(event) {
    all.classList.add("is-active-all");
    button.classList.remove("is-active");
    button.setAttribute("data-state", "inactive");
    resetGallery();
    console.log(event);
  }
  // Assign the listener callback to a variable
  var doClick = (event) => event_handler(event);
  all.addEventListener("click", doClick);

  console.log(button);
  if (buttonState == "inactive") {
    button.classList.add("is-active");
    button.setAttribute("data-state", "active");
    all.classList.remove("is-active-all");
    handleFilterGallery(param);
  } else {
    button.classList.remove("is-active");
    button.setAttribute("data-state", "inactive");
    resetGallery();
  }
};
const handleFilterGallery = (param) => {
  let filteredPosts = [...postsData].filter(
    (post) => post.category.name == param
  );

  postsContainer.innerHTML = "";
  filteredPosts.map((post) => GenerateGallery(post));
};

const resetGallery = () => {
  postsContainer.innerHTML = "";
  postsData.map((post) => GenerateGallery(post));
};

// ----------- EditionMode -------------

function editionModeActive() {
  const token = window.localStorage.getItem("token");
  if (token) {
    const bandeau = document.querySelector(".bandeau");
    bandeau.style.display = "flex";
    const editbutton = document.querySelectorAll("#active");
    const editbuttonImg = document.querySelector("#active-img");
    editbuttonImg.style.display = "inline-flex";
    editbutton.forEach((userItem) => {
      userItem.style.display = "inline-flex";
    });
  }
}

editionGallery.forEach((el) => el.addEventListener("click", customGallery));

function customGallery() {
  const modale = document.querySelector(".modal-container");
  modale.style.display = "block";
  const modalAddNewWorks = document.querySelector(".modal_2");
  modalAddNewWorks.style.display = "none";
}

function fetchGallery(works) {
  for (let i = 0; i < works.length; i++) {
    const work = works[i];

    const gallery = document.createElement("div");
    gallery.className = "gallery_post";
    gallery.innerHTML = `<div><div class="gallery_edit"><img class="gallery_image" src="${works[i].imageUrl}" alt="${works[i].title}">
    <div class="gallery_edit_content">
    <div class="delete_button" deleteId="${works[i].id}"><i class="fa-regular fa-trash-can"></i></div>
    </div>
    </div>
        <p class="post-title">Editer</p>
        </div>
  `;
    galleryCustom.append(gallery);

    const trash = gallery.querySelector(".delete_button");
    const id = trash.getAttribute("deleteId");
    trash.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(id);
      DeleteWorks(id);
    });
  }
}

async function DeleteWorks(id) {
  let monToken = localStorage.getItem("token");
  await fetch(Url + `works/${id}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${monToken}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Projet supprimer ce projet");
        closedModal();
        fetchWorks().catch((error) => {
          error.message; // 'An error has occurred: 404'
        });
      } else {
        alert(
          "Vous n'êtes pas autorisé à supprimer ce projet, merci de vous connecter avec un compte valide"
        );
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

addWorks.addEventListener("click", addNewWorks);
backModale.addEventListener("click", backModal);
closeModale.forEach((element) =>
  element.addEventListener("click", closedModal)
);
function addNewWorks() {
  const modalgallery = document.querySelector(".modal");
  modalgallery.style.display = "none";
  const modalAddNewWorks = document.querySelector(".modal_2");
  modalAddNewWorks.style.display = "block";
  fetchCategory();
  console.log("addNewWorks");
}

function backModal() {
  modalgallery.style.display = "block";
  modalAddNewWorks.style.display = "none";
}
function closedModal() {
  modale.style.display = "none";
  modalgallery.style.display = "block";
  modalAddNewWorks.style.display = "none";
}

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closedModal(e);
  }
});
window.addEventListener("click", function (e) {
  if (e.target === modale) {
    modale.style.display = "none";
  }
});

// L'image img#image
const image = document.getElementById("image");
const imageUpload = document.querySelector(".image-upload");

// La fonction previewPicture
const previewPicture = function (e) {
  // e.files contient un objet FileList
  const [picture] = e.files;
  // Les types de fichier autorisés
  var types = ["image/jpg", "image/jpeg", "image/png"];
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
      image.src = e.target.result;
      image.style.display = "inline-block";
      imageUpload.style.display = "none";
    };
    // On lit le fichier "picture" uploadé
    reader.readAsDataURL(picture);
  }
  // Affichez le bouton "Modifier l'image"
  changeImageButton.style.display = "block";
};

async function fetchCategory() {
  try {
    const response = await fetch(Url + "categories");
    const categories = await response.json();

    if (Array.isArray(categories) && categories.length > 0) {
      const selectCategory = document.querySelector("#categorie");
      selectCategory.innerHTML = categories.map(
        (category) => `<option value="${category.id}">${category.name}</option>`
      );

      console.log(selectCategory);
    } else {
      // Gérer le cas où postsData est vide ou non défini
      console.log("Aucune donnée de catégorie trouvée.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
}

const form = document.querySelector(".modal_2 form");
// form.addEventListener("click", PostWorks)
const Titleform = document.querySelector("#title");

const ButtonValider = document.querySelector("#design_button");
function changeTheColorOfButton() {
  if (Titleform.value !== "") {
    ButtonValider.style.background = "#1D6154";
  } else {
    ButtonValider.style.background = "#A7A7A7";
  }
}
let formSubmitted = false; // Variable pour suivre si le formulaire a été soumis
// Gestionnaire d'événements pour le champ de fichier
document.getElementById("fileToUpload").addEventListener("change", function () {
  const Titleform = document.querySelector("#title");
  const errorTitle = document.querySelector("#Error_title");
  const imagefile = this.files[0];
  const errorImage = document.querySelector("#Error_Image");

  if (!imagefile) {
    errorImage.innerHTML = "<p>*L'image n'est pas saisie !</p>";
  } else {
    errorImage.innerHTML = "";
    // Supprimez l'élément d'image existant
    const image = document.getElementById("image");
    image.style.display = "none";
    image.src = "";

    // Affichez le bouton "Modifier l'image"
    const changeImageButton = document.getElementById("changeImageButton");
    changeImageButton.style.display = "block";
  }
});
// 2 // ----- submit method for Post -----
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const Titleform = document.querySelector("#title");
  const Categorieform = document.querySelector("#categorie");
  const imagefile = document.getElementById("fileToUpload").files[0]; //the File Upload input
  const errorTitle = document.querySelector("#Error_title");
  const errorImage = document.querySelector("#Error_Image");
  console.log("postWork");
  let isImageError = false;
  let isTitleError = false;

  if (!Titleform.value) {
    errorTitle.innerHTML = "<p>*Le titre n'est pas saisi !</p>";
    isTitleError = true;
  } else {
    errorTitle.innerHTML = "";
  }

  if (!imagefile) {
    errorImage.innerHTML = "<p>*L'image n'est pas saisie !</p>";
    isImageError = true;
  } else {
    errorImage.innerHTML = "";
  }

  if (isTitleError || isImageError) {
    // Au moins une erreur est présente, n'envoyez pas le formulaire
    return;
  }

  const formData = new FormData();
  formData.append("image", imagefile);
  formData.append("title", Titleform.value);
  formData.append("category", Categorieform.value);
  let monToken = localStorage.getItem("token");
  try {
    const response = await fetch(Url + "works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${monToken}`,
      },
      body: formData,
    });

    const result = await response.json();
    alert("Projet ajouté avec succès :)");
    closedModal();
  } catch (error) {
    console.error("Error:", error);
  }
});

// Récupérez la référence au bouton "Modifier l'image"
const changeImageButton = document.getElementById("changeImageButton");

// Lorsque l'utilisateur clique sur "Modifier l'image"
changeImageButton.addEventListener("click", function () {
  // Réinitialisez le champ de fichier pour permettre la sélection d'une nouvelle image
  const fileToUpload = document.getElementById("fileToUpload");
  fileToUpload.value = ""; // Effacez la sélection actuelle
  fileToUpload.click(); // Ouvrez la boîte de dialogue de sélection de fichier

  // Cachez le bouton "Modifier l'image" jusqu'à ce qu'une nouvelle image soit sélectionnée
  changeImageButton.style.display = "none";
});
