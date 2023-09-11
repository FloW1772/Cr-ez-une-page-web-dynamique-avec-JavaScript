// Définir des variables globales
let gallery = document.querySelector('.gallery');
let projects = [];
let categories = [];
let categoriesFilters = document.querySelector('.categories-filters');

// Récupérer les données des projets depuis l'API
async function getProjects() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    projects = await response.json();
  } catch (error) {
    console.error(error);
  }
}

// Récupérer les données des catégories depuis l'API
async function getCategories() {
  try {
    const response = await fetch('http://localhost:5678/api/categories');
    categories = await response.json();
    categories.unshift({ name: 'Tous' }); // Ajouter une catégorie "Tous"
  } catch (error) {
    console.error(error);
  }
}

// Filtrer les projets par catégorie lorsque le bouton de catégorie est cliqué
function filterProjectsByCategory(category) {
  let projectsInGallery = document.querySelectorAll('.gallery figure');

  for (let projectInGallery of projectsInGallery) {
    let projectCategoryId = parseInt(projectInGallery.getAttribute('data-category-id'));

    if (category === 'Tous' || category.name === categories[projectCategoryId].name) {
      projectInGallery.style.display = 'block'; // Afficher les projets de la catégorie sélectionnée
    } else {
      projectInGallery.style.display = 'none'; // Masquer les projets qui n'appartiennent pas à la catégorie sélectionnée
    }
  }
}

// Afficher les projets dans la galerie
function displayProjects() {
  for (let project of projects) {
    let figure = document.createElement('figure');
    figure.classList.add('display');
    figure.setAttribute('data-category-id', project.categoryId);

    // Ajouter l'image à l'élément figure
    let img = document.createElement('img');
    img.setAttribute('src', project.imageUrl);
    img.setAttribute('alt', project.title);
    figure.appendChild(img);

    // Ajouter les informations du projet à l'élément figure
    let titleElement = document.createElement('p');
    titleElement.textContent = project.title;
    figure.appendChild(titleElement);

    gallery.appendChild(figure);
  }
}

// Afficher les catégories et ajouter des écouteurs d'événements de clic
async function displayCategories() {
  await getCategories();

  for (let category of categories) {
    let button = document.createElement('button');
    button.innerText = category.name;
    button.classList.add('button');
    categoriesFilters.appendChild(button);

    button.addEventListener('click', function (event) {
      filterProjectsByCategory(category);
    });
  }
}

// Initialiser la page
async function initializePage() {
  await getProjects();
  displayProjects();
  displayCategories();
}

// Appeler la fonction d'initialisation pour démarrer la page
initializePage();
