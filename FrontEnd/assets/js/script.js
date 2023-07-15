// Modifiez le chemin vers l'API si nécessaire
const apiUrl = 'http://localhost:5678/api/works';

let gallery = document.querySelector('.gallery');
let projects = [];

async function getProjects() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    projects = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function displayProjects() {
  await getProjects();

  for (let project of projects) {
    let figure = document.createElement('figure');
    figure.setAttribute('class', 'display');

    let image = new Image();
    // Assurez-vous que la propriété "imageURL" est correctement définie dans l'objet "project"
    // Utilisez la propriété "imageURL" pour définir la source de l'image
    image.src = project.imageURL;
    image.alt = project.title;
    figure.appendChild(image);

    let caption = document.createElement('figcaption');
    // Assurez-vous que la propriété "title" est correctement définie dans l'objet "project"
    // Utilisez la propriété "title" pour définir le texte de la légende
    caption.innerText = project.title;
    figure.appendChild(caption);

    gallery.appendChild(figure);
  }
}

displayProjects();
