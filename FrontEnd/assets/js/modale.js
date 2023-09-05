if (isAdmin()) {
  // Ajouter le bouton de modification si l'utilisateur est administrateur
  const portfolioTitle = document.querySelector(".portfolio-title");
  const modifyBtn = document.createElement("button");
  const myModal = document.querySelector ('#myModal')
  const addPicture = document.querySelector ('.add-picture')
  const delPicture = document.querySelector ('.del-picture')
  const modalTitle = document.querySelector ('.modal-title')
  const backgroundgray = document.querySelector('.background-gray')
  modifyBtn.setAttribute('id', 'modify-btn');
  modifyBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> <span>modifier</span>`;
  portfolioTitle.appendChild(modifyBtn);
  let addProjectDiv = document.querySelector('.add-project.hidden');
  const gallerymodal = document.querySelector('.modal-container-gallery')
  const closeModalButton = document.getElementById('closeModal'); 



// Sélectionnez le bouton avec la classe "return-back"
const returnBackButton = document.querySelector('.return-back');

// Sélectionnez l'élément que vous voulez rendre invisible lorsque le bouton est cliqué
const addProject = document.querySelector('.add-project');
const modalContainerGallery = document.querySelector('.modal-container-gallery');

// Ajoutez un écouteur d'événements au bouton
returnBackButton.addEventListener('click', function() {
  // Ajoutez ou supprimez la classe "hidden" pour rendre l'élément invisible ou visible
  addProject.classList.toggle('hidden');
  modalContainerGallery.classList.remove('hidden');
  
  // Rendez le bouton "ajouter une photo" visible à nouveau
  addPicture.classList.toggle('hidden'); // Retirez la classe "hidden" de l'élément add-picture
  delPicture.classList.toggle('hidden');
  // addPicture.style.display = 'none'

});




  modifyBtn.addEventListener('click', function(event){
    myModal.classList.toggle('hidden')
    const addPicture = document.querySelector ('.add-picture')
    const delPicture = document.querySelector ('.del-picture')
    addPicture.classList.toggle('hidden'); // Retirez la classe "hidden" de l'élément add-picture
    delPicture.classList.toggle('hidden');

  })

  backgroundgray.addEventListener('click', function(event){
    myModal.classList.toggle('hidden')
  })
  closeModalButton.addEventListener('click', function(event) {
    myModal.classList.toggle('hidden');
})
  
  addPicture.addEventListener('click',function(event){
    gallerymodal.classList.toggle('hidden')
    addProjectDiv.classList.toggle('hidden')
    delPicture.classList.toggle('hidden')
    modalTitle.style.display = 'none';
    addPicture.classList.toggle('hidden')
    

  })
  displayGalleryOnModale(gallerymodal)
  // generateAddImageForm(addProjectDiv);
  
  // showModal(); // Afficher la modale après avoir ajouté les éléments à la galerie
}


async function displayGalleryOnModale (gallerymodal){
  // Supposons que ce code soit à l'intérieur de la boucle qui gère l'ouverture de la modale pour chaque projet
  await getProjects();
  console.log(projects)
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
      titleElement.textContent = "éditer";
      
  
      figure.appendChild(titleElement);

      // Ajouter la figure à la galerie
      gallerymodal.appendChild(figure);

      // Créer les boutons cliquables sous les images
      let button1 = document.createElement('button');
      button1.innerHTML = `<i class="fa-solid fa-up-down-left-right"></i>`;
      button1.setAttribute('class','btn-mouv hidden')
      button1.addEventListener('click', () => {
          // Code à exécuter lorsque le bouton 1 est cliqué
      });
      figure.appendChild(button1);

      let button2 = document.createElement('button');
      button2.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
      button2.setAttribute('class','btn-trash')
      button2.addEventListener('click', () => {
          // Code à exécuter lorsque le bouton 2 est cliqué
          deleteProject(project.id)
      });
      figure.appendChild(button2);
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

// Définition de la fonction pour générer le formulaire d'ajout d'image
function generateAddImageForm(addProjectDiv) {
  var form = document.createElement('form');
  form.setAttribute('action', ''); // Mettez l'URL de l'API appropriée ici
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');
  form.setAttribute('id', 'imageForm');

  var titleLabel = document.createElement('h2');
  titleLabel.textContent = 'Ajout photo';

  var imageLabel = document.createElement('label');
  imageLabel.setAttribute('for', 'project-image');
  imageLabel.textContent = 'Choisir une image :';

  var imageInput = document.createElement('input');
  imageInput.setAttribute('type', 'file');
  imageInput.setAttribute('id', 'project-image');
  imageInput.setAttribute('name', 'project-image');
  imageInput.setAttribute('accept', 'image/*');
  imageInput.setAttribute('required', 'true');

  var nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'project-name');
  nameLabel.textContent = 'Titre :';

  var nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'project-name');
  nameInput.setAttribute('name', 'project-name');
  // nameInput.setAttribute('onkeyup', 'checkForm()');
  nameInput.setAttribute('required', 'true');

  var categoryLabel = document.createElement('label');
  categoryLabel.setAttribute('for', 'category-select');
  categoryLabel.textContent = 'Catégorie :';

  var categorySelect = document.createElement('select');
  categorySelect.setAttribute('id', 'category-select');
  categorySelect.setAttribute('name', 'category-select');
  // categorySelect.setAttribute('onchange', 'checkForm()');
  categorySelect.setAttribute('required', 'true');

  var defaultOption = document.createElement('option');
  defaultOption.setAttribute('value', '');
  defaultOption.textContent = 'Sélectionner une catégorie';
  categorySelect.appendChild(defaultOption);

  var objetsOption = document.createElement('option');
  objetsOption.setAttribute('value', 1);
  objetsOption.textContent = 'Objets';
  categorySelect.appendChild(objetsOption);

  var appartementsOption = document.createElement('option');
  appartementsOption.setAttribute('value', 2);
  appartementsOption.textContent = 'Appartements';
  categorySelect.appendChild(appartementsOption);

  var hotelsOption = document.createElement('option');
  hotelsOption.setAttribute('value', 3);
  hotelsOption.textContent = 'Hotels & restaurants';
  categorySelect.appendChild(hotelsOption);

  var submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('id', 'submitBtn');
  submitButton.setAttribute('name', 'submit');
  submitButton.setAttribute('disabled', 'true');
  submitButton.style.fontFamily = 'Syne';
  submitButton.style.fontWeight = '700';
  
  submitButton.style.margin = '2em auto';
  submitButton.style.width = '190px';
  submitButton.style.textAlign = 'center';
  submitButton.style.borderRadius = '60px';
  submitButton.style.height = '30px';
  submitButton.textContent = 'Valider';




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

  // addProjectDiv.innerHTML = ''; // Nettoie le contenu précédent
  addProjectDiv.appendChild(form);
}


// Appel de la fonction pour générer le formulaire d'ajout d'image
const addProjectDiv = document.getElementById("addProjectDiv");
generateAddImageForm(addProjectDiv);

// Ajout d'un écouteur d'événement pour la soumission du formulaire
const imageForm = document.getElementById("imageForm");

imageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Récupération des données du formulaire
  const imageFile = document.getElementById("project-image").files[0];
  const imageName = document.getElementById("project-name").value;
  const imageCategory = document.getElementById("category-select").value;
  let categoryNumber =  parseInt(imageCategory)
console.log(categoryNumber)
// debugger
  // Création de l'objet FormData pour envoyer les fichiers et les autres données
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", imageName);
  formData.append("category", categoryNumber);

  // Envoi de la requête API pour ajouter l'image
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // Inclure le jeton d'authentification
    },
    body: formData
  })
  .then((response) => response.json())
  .then((data) => {
    // Gérer la réponse comme nécessaire
    console.log(data);
  })
  .catch((error) => console.log(error));
});

let addProjectImage = document.querySelector('#project-image')
let addProjectName = document.querySelector('#project-name')
let addProjectCategory = document.querySelector('#category-select')
let submitButton = document.querySelector('#submitBtn')
  // Ajout de l'écouteur d'événement pour la validation du formulaire
  addProjectImage.addEventListener('change',function(event){ 
  checkForm(addProjectImage, addProjectName, addProjectCategory, submitButton)
});
  addProjectName.addEventListener('keyup', function(event){
  checkForm(addProjectImage,addProjectName, addProjectCategory, submitButton)
});
  addProjectCategory.addEventListener('change',function(event){
   checkForm(addProjectImage,addProjectName, addProjectCategory, submitButton)
  });

  function checkForm(imageInput, nameSelect, categorySelect, submitButton) {
    // let test=document.querySelector('#name')
    console.log(imageInput)
    console.log(nameSelect)
    console.log(categorySelect)
    // console.log(test)
    var imageInputValue = imageInput.value;
    var nameInputValue = nameSelect.value;
    var categorySelectValue = categorySelect.value;
  
    console.log(imageInputValue)
    console.log(nameInputValue)
  
  
    console.log(imageInputValue !== '' && nameInputValue !== '' && categorySelectValue !== '')
  
    if (imageInputValue !== '' && nameInputValue !== '') {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'true');
    }
  }