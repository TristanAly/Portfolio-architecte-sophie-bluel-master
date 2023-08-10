const Url = "http://localhost:5678/api/";
const all = document.querySelector(".all_button");
const postsContainer = document.querySelector(".gallery");
const filterContainer = document.querySelector(".filter");
const editionGallery = document.querySelector(".edition_gallery");

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
}

// ----------- EditionMode -------------


// const editionMode = (photosModal) => {
// function genererPhotosModal(photosModal) {
//   //Création d'une boucle qui va prendre toutes les photos
//   for (let i = 0; i < photosModal.length; i++) {
//     // Création des balises
//     const article = photosModal[i];

//     const sectionGallery = document.querySelector(".galleryModal");

//     const articleElement = document.createElement("article");
//     articleElement.classList.add("photosRealisation");
//     articleElement.dataset.id = [i];

//     const idElement = document.createElement("p");
//     idElement.innerText = article.id;

//     const titleElement = document.createElement("p");
//     titleElement.innerText = "editer";

//     //Ajout de l'icone supprimé-----------
//     const iconeElement = document.createElement("div");
//     iconeElement.classList.add("deletePhoto");
//     iconeElement.innerHTML =
//       '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/></svg>';

//     const imageElement = document.createElement("img");
//     imageElement.src = article.imageUrl;

//     const categoryIdElement = document.createElement("p");
//     categoryIdElement.innerText = article.categoryId;

//     //Ajout de articleElement dans sectionGallery

//     sectionGallery.appendChild(articleElement);

//     //Ajout de nos balises au DOM
//     articleElement.appendChild(imageElement);
//     articleElement.appendChild(titleElement);
//     articleElement.appendChild(iconeElement);

//     //--------------Suppression photo--------------------------------
//     iconeElement.addEventListener("click", async (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       const iconeElement = article.id;
//       let monToken = localStorage.getItem("token");
//       console.log(iconeElement);
//       let response = await fetch(
//         `http://localhost:5678/api/works/${iconeElement}`,
//         {
//           method: "DELETE",
//           headers: {
//             accept: "*/*",
//             Authorization: `Bearer ${monToken}`,
//           },
//         }
//       );
//       if (response.ok) {
//         return false;
//         // if HTTP-status is 200-299
//         //alert("Photo supprimé avec succes");
//         // obtenir le corps de réponse (la méthode expliquée ci-dessous)
//       } else {
//         alert("Echec de suppression");
//       }
//     });
//   }
// }
//     //---------------FIN DE GENERER PHOTO--------------------
//   }