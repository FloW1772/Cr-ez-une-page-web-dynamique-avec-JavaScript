// JavaScript Code
let gallery = document.querySelector('.gallery');
let projects = [];

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

    // Add the image to the figure element
    let img = document.createElement('img');
    img.setAttribute('src', project.imageUrl); // Assuming imageUrl is the property holding the image URL
    img.setAttribute('alt', project.title); // Assuming title is the property holding the image alt text
    figure.appendChild(img);

    // Add project information (e.g., title and description) to the figure element
    let titleElement = document.createElement('h2');
    titleElement.textContent = project.title; // Assuming title is the property holding the project title
    figure.appendChild(titleElement);

    let descriptionElement = document.createElement('p');
    descriptionElement.textContent = project.description; // Assuming description is the property holding the project description
    figure.appendChild(descriptionElement);

    gallery.appendChild(figure);
  }
}

displayProjects();
