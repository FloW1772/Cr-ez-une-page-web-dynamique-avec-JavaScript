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
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const data = await response.json();
    categories = data;
  } catch (error) {
    console.log(error);
  }
}

async function displayCategories() {
  await getCategories(); // Attendez que les catégories soient récupérées avant de continuer.
  console.log(categories);

  // Supposons que `categoriesFilters` est défini comme un élément DOM valide.
  for (let categorie of categories) {
    console.log(categorie);
    let button = document.createElement('button');
    button.innerText = categorie.name;
    categoriesFilters.appendChild(button);
    button.addEventListener("click", function (event) {
      filterProjectsByCategory(categorie.id);
    });
  }
}

function filterProjectsByCategory(categoryId) {
  let projectsInGallery = document.querySelectorAll(".gallery figure");
  for (let projectInGallery of projectsInGallery) {
    const projectCategoryId = projectInGallery.getAttribute('data-category-id');
    if (projectCategoryId === categoryId) {
      // Afficher les projets de cette catégorie.
      projectInGallery.style.display = "block";
    } else {
      // Masquer les projets qui n'appartiennent pas à cette catégorie.
      projectInGallery.style.display = "none";
    }
  }
}

displayCategories();