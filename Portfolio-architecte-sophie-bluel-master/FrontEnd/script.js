const Url = "http://localhost:5678/api/";
const all = document.querySelector(".all_button");
const postsContainer = document.querySelector(".gallery");
const filterContainer = document.querySelector(".filter");
const editionGallery = document.querySelector(".edition_mode");

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

editionGallery.addEventListener('click', customGallery)

const iconDelete = document.querySelector(".delete_button")
iconDelete.addEventListener("click", (e) => {
    console.log("DeleteClick");
    e.preventDefault();
});

function customGallery (){
 const modale = document.querySelector(".modal")
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
  <div class="delete_button"><i class="fa-regular fa-trash-can"></i></div>
  </div>
  </div>
        <p class="post-title">Editer</p>
        </div>
  `;
  galleryCustom.append(gallery);
});
// const iconDelete = document.querySelector(".delete_button")
// //     // Création des balises
// const article = post;
// console.log(`${article.id}`)
// iconDelete.addEventListener("click", async (e) => {
//   console.log("testClick");
//   e.preventDefault();
//   e.stopPropagation();
//   const iconeElement = article.id;
//   let monToken = localStorage.getItem("token");
//   console.log(iconeElement);
//   let response = await fetch(
//   `${Url}${iconeElement}`,
//   {
//     method: "DELETE",
//     headers: {
//       accept: "*/*",
//       Authorization: `Bearer ${monToken}`,
//     },
//   }
//   );
//   if (response.ok) {
//     return false;
//     // if HTTP-status is 200-299
//     //alert("Photo supprimé avec succes");
//     // obtenir le corps de réponse (la méthode expliquée ci-dessous)
//   } else {
//     alert("Echec de suppression");
//   }
// });
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
  if (response.ok) {
        alert("Photo supprimé avec succes");
  } else {
    alert("Echec de suppression");
  }
})
.catch(error => {
  console.log(error);
})
}

const addWorks = document.querySelector(".add_works");

addWorks.addEventListener("click", addNewWorks)

function addNewWorks() {
  console.log("addNewWorks");
}

function PostWorks() {
fetch(Url + "works", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${monToken}`,
    "Content-Type": "application/json",
  },
  body: {
    title: "",
    imageUrl: "",
    categoryId: 0,
  }
}).then(response => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response.status);
  }
})
.catch(error => {
  console.log(error);
})
}