if (isAdmin()) {
  // Ajouter le bouton de modification si l'utilisateur est administrateur
  const portfolioTitle = document.querySelector(".portfolio-title");
  const modifyBtn = document.createElement("button");
  const myModal = document.querySelector ('#myModal')
  const backgroundgray = document.querySelector('.background-gray')
  modifyBtn.setAttribute('id', 'modify-btn');
  modifyBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> <span>modifier</span>`;
  portfolioTitle.appendChild(modifyBtn);

  modifyBtn.addEventListener('click', function(event){
    myModal.classList.toggle('hidden')

  })

  backgroundgray.addEventListener('click', function(event){
    myModal.classList.toggle('hidden')
  })
  
  displayGalleryOnModale()
  // showModal(); // Afficher la modale après avoir ajouté les éléments à la galerie
}


async function displayGalleryOnModale (){
  // Supposons que ce code soit à l'intérieur de la boucle qui gère l'ouverture de la modale pour chaque projet
  await getProjects();
  console.log(projects)
  const gallerymodal = document.querySelector('.modal-container-gallery')
  for (let project of projects) {
      // openModal(project.imageUrl, project.title);

      // Créer une figure pour chaque projet et l'ajouter à la galerie
      let figure = document.createElement('figure');
      figure.setAttribute('class', 'display-figure-modal');
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

      // Ajouter la figure à la galerie
      gallerymodal.appendChild(figure);

      // Créer les boutons cliquables sous les images
      let button1 = document.createElement('button');
      button1.textContent = 'Bouton 1';
      button1.addEventListener('click', () => {
          // Code à exécuter lorsque le bouton 1 est cliqué
      });
      gallerymodal.appendChild(button1);

      let button2 = document.createElement('button');
      button2.textContent = 'Bouton 2';
      button2.addEventListener('click', () => {
          // Code à exécuter lorsque le bouton 2 est cliqué
          deleteProject(project.id)
      });
      gallerymodal.appendChild(button2);
  }

}

function deleteProject (id){
  const token = localStorage.getItem('token')
fetch(`http://localhost:5678/api/works/${id}`,{
  method:"DELETE",
  headers:{
    'Content-Type': 'application/json;charset=utf-8',
    "accept":"*/*",
    'authorization':`Bearer ${token}`
  }
})
.then((response)=>{
  console.log(response)
  displayProjects()
  displayGalleryOnModale()
})
.catch((error)=>console.log(error))
}

function generateAddImageForm() {
  var addProjectDiv = document.querySelector('.add-project.hidden');

  var form = document.createElement('form');
  form.setAttribute('action', 'modale.js'); // Spécifiez l'action appropriée ici
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');
  form.setAttribute('id', 'imageForm');

  var titleLabel = document.createElement('h2');
  titleLabel.textContent = 'Ajouter une image';

  var imageLabel = document.createElement('label');
  imageLabel.setAttribute('for', 'image');
  imageLabel.textContent = 'Choisir une image :';

  var imageInput = document.createElement('input');
  imageInput.setAttribute('type', 'file');
  imageInput.setAttribute('id', 'image');
  imageInput.setAttribute('name', 'image');
  imageInput.setAttribute('accept', 'image/*');
  imageInput.setAttribute('required', 'true');

  var nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Nom de l\'image :';

  var nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'name');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('onkeyup', 'checkForm()');
  nameInput.setAttribute('required', 'true');

  var categoryLabel = document.createElement('label');
  categoryLabel.setAttribute('for', 'category');
  categoryLabel.textContent = 'Catégorie :';

  var categorySelect = document.createElement('select');
  categorySelect.setAttribute('id', 'category');
  categorySelect.setAttribute('name', 'category');
  categorySelect.setAttribute('onchange', 'checkForm()');
  categorySelect.setAttribute('required', 'true');

  var defaultOption = document.createElement('option');
  defaultOption.setAttribute('value', '');
  defaultOption.textContent = 'Sélectionner une catégorie';
  categorySelect.appendChild(defaultOption);

  var objetsOption = document.createElement('option');
  objetsOption.setAttribute('value', 'objets');
  objetsOption.textContent = 'Objets';
  categorySelect.appendChild(objetsOption);

  var appartementsOption = document.createElement('option');
  appartementsOption.setAttribute('value', 'appartements');
  appartementsOption.textContent = 'Appartements';
  categorySelect.appendChild(appartementsOption);

  var hotelsOption = document.createElement('option');
  hotelsOption.setAttribute('value', 'hotels');
  hotelsOption.textContent = 'Hotels & restaurants';
  categorySelect.appendChild(hotelsOption);

  var submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('id', 'submitBtn');
  submitButton.setAttribute('name', 'submit');
  submitButton.setAttribute('disabled', 'true');
  submitButton.textContent = 'Ajouter l\'image';

  form.appendChild(titleLabel);
  form.appendChild(imageLabel);
  form.appendChild(imageInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(document.createElement('br'));
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);
  form.appendChild(document.createElement('br'));
  form.appendChild(submitButton);

  addProjectDiv.innerHTML = ''; // Nettoie le contenu précédent
  addProjectDiv.appendChild(form);
}

// Utilisation de la fonction pour générer le formulaire lorsqu'il est nécessaire
generateAddImageForm();