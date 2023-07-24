let gallery = document.querySelector('.gallery');
let projects = [];
let categories = [];
let categoriesFilters = document.querySelector('.categories-filters');

async function getProjects() {
  await fetch('http://localhost:5678/api/works')
    .then((response) => response.json())
    .then((data) => {
      projects = data;
    })
    .catch((error) => console.log(error));
}

async function getCategories() {
  await fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
      categories = data;
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
    figure.setAttribute('data-category-id', project.categoryId);

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

async function displayCategories() {
  await getCategories();
  console.log(categories);
  categories.unshift({name:'Tous'})
  for (let category of categories) {
    console.log(category);

    let button = document.createElement('button');
    button.innerText = category.name;
    button.classList.add('button'); // Ajout de la classe "button" au bouton
    categoriesFilters.appendChild(button);

    button.addEventListener('click', function (event) {
      let projectsInGallery = document.querySelectorAll('.gallery figure');

      for (let projectInGallery of projectsInGallery) {
        console.log(category.id);
        console.log(projectInGallery.getAttribute('data-category-id'));

        if (category.id === undefined){
          projectInGallery.style.display = 'block'; // Afficher les projets de la catégorie sélectionnée

        }else if (parseInt(projectInGallery.getAttribute('data-category-id')) === category.id) {
          projectInGallery.style.display = 'block'; // Afficher les projets de la catégorie sélectionnée
        } else {
          projectInGallery.style.display = 'none'; // Masquer les projets qui n'appartiennent pas à la catégorie sélectionnée
        }
      }
    });
  }
}

displayProjects();
displayCategories();