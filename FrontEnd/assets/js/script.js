// JavaScript Code
let gallery = document.querySelector('.gallery');
let projects = [];
let categories = [];
let categoriesFilters = document.querySelector('.categories-filters')

async function getProjects() {
  await fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((data) => {
      projects = data;
    })
    .catch((error) => console.log(error));
}

async function displayProjects() {
  await getProjects();
  console.log(projects);
  for (let project of projects) {
    console.log(project);

    let figure = document.createElement('figure');
    figure.setAttribute('class', 'display');
    figure.setAttribute('data-category-id',project.categoryId)

    // Add the image to the figure element
    let img = document.createElement('img');
    img.setAttribute('src', project.imageUrl); // Assuming imageUrl is the property holding the image URL
    img.setAttribute('alt', project.title); // Assuming title is the property holding the image alt text
    figure.appendChild(img);

    // Add project information (e.g., title and description) to the figure element
    let titleElement = document.createElement('p');
    titleElement.textContent = project.title; // Assuming title is the property holding the project title
    figure.appendChild(titleElement);


    gallery.appendChild(figure);
  }
}

displayProjects();

async function getCategories() {
  await fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
      categories = data;
    })
    .catch((error) => console.log(error));
}
async function displayCategories(){
  await getProjects();
  await getCategories();
  console.log(categories);
  for (let categorie of categories){
    console.log(categorie)
    let button = document.createElement('button')
    button.innerText = categorie.name
    categoriesFilters.appendChild(button);
    button.addEventListener("click",function(event){
      let projectsInGallery = document.querySelectorAll(".gallery figure")
      for (let projectInGallery of projectsInGallery){
        console.log(categorie.id)
        console.log(projectInGallery.getAttribute('data-category-id'))
        console.log('-----')
      }
    })


  }
}
displayCategories();