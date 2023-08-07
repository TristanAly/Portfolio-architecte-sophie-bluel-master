const URL = "http://localhost:5678/api/";
const all = document.querySelector(".all");
const postsContainer = document.querySelector(".gallery");
const filterContainer = document.querySelector(".filter");

let postsData = "";
let filterData = "";

fetch(URL + "works")
.then(async (response) => {
  postsData = await response.json();
  postsData.map((post) => createPost(post));
  filterData = [
    ...new Set(
      postsData
        .map((post) => post.category.name)
        // .reduce((acc, curVal) => acc.concat(curVal),[])
        // .filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
    )
  ];
  console.log(filterData);
  // filterData.unshift("Tout")
  filterData.map((filter) => createFilter(filter));
});

const createPost = (postData) => {
  const { title, imageUrl, category } = postData;
  const post = document.createElement("div");
  post.className = "post";
  post.innerHTML = `<img class="post-image" src="${imageUrl}"><div class="post-content">
        <p class="post-title">${title}</p>
      </div>
  `;
  postsContainer.append(post);
};

const createFilter = (filter) => {
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
  // all.addEventListener("click", resetPosts);
  function event_handler(event) {
    all.classList.add('is-active-all');
    button.classList.remove('is-active');
    button.setAttribute('data-state', 'inactive')
    resetPosts()
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
    handleFilterPosts(param)
  } else {
    button.classList.remove('is-active');
    button.setAttribute('data-state', 'inactive')
    resetPosts()
  } 
}
const handleFilterPosts = (param) => {
  let filteredPosts = [...postsData].filter(post => post.category.name == param);
  
  
  postsContainer.innerHTML = "";
  filteredPosts.map(post => createPost(post))
};

const resetPosts = () => {
  postsContainer.innerHTML = "";
  postsData.map((post) => createPost(post));
}

// const allPosts = (touch) => {
//   resetPosts();
//   // if (stateTouch =='is-active'){
//   touch.classList.remove('is-active');
//   touch.setAttribute('data-state', 'inactive');
// // }
// }
// fetch(URL + "categories")
// .then((resp) => resp.json())
// .then(function(data) {
//     let categories = data;
//     console.log(data);
//     return categories?.map(function(categorie) {
//     let div = createNode('div');
//     div.classList.add("filter_button");
//     let categoriesName = createNode('p');

//     categoriesName.innerHTML = categorie.name;
//     append(filter, div);
//     append(div, categoriesName);
//     })

// })
// .catch(function(error) {
//     console.log(error);
// });

// fetch(URL + "works")
// .then((resp) => resp.json())
// .then(function(data) {
//     let works = data;
//     console.log(data);
//     return works?.map(function(work) {
//     let figure = createNode('figure');
//     let image = createNode('img');
//     let title = createNode('figcaption');

//     image.src = work.imageUrl
//     title.innerHTML = work.title;
//     append(figure, image);
//     append(figure, title);
//     append(gallery, figure);
//     })
// })

// .catch(function(error) {
//     console.log(error);
// });


// // function
// function createNode(element) {
// 	return document.createElement(element);
// };
// function append(parent, el) {
// 	return parent.appendChild(el)
// };
