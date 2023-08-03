const URL = "http://localhost:5678/api/";
const gallery = document.querySelector(".gallery");
const filter = document.querySelector(".filter");

fetch(URL + "categories")
.then((resp) => resp.json())
.then(function(data) {
    let categories = data;
    console.log(data);
    return categories?.map(function(categorie) {
    let div = createNode('div');
    div.classList.add("filter_button");
    let categoriesName = createNode('p');

    categoriesName.innerHTML = categorie.name;
    append(filter, div);
    append(div, categoriesName);
    })
})
.catch(function(error) {
    console.log(error);
});

fetch(URL + "works")
.then((resp) => resp.json())
.then(function(data) {
    let works = data;
    console.log(data);
    return works?.map(function(work) {
    let figure = createNode('figure');
    let image = createNode('img');
    let title = createNode('figcaption');

    image.src = work.imageUrl
    title.innerHTML = work.title;
    append(figure, image);
    append(figure, title);
    append(gallery, figure);
    })
})
.catch(function(error) {
    console.log(error);
});


// function
function createNode(element) {
	return document.createElement(element);
};
function append(parent, el) {
	return parent.appendChild(el)
};
