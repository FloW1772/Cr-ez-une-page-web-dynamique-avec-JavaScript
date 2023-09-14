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
  const imagePreview = document.getElementById('image-preview');
 

  document.addEventListener('DOMContentLoaded', function() {
    
  });

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
  modalTitle.classList.toggle('hidden');
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
    addPicture.classList.toggle('hidden')
    delPicture.classList.toggle('hidden')
    // imagePreview.classList.toggle('hidden');
  })
  closeModalButton.addEventListener('click', function(event) {
    myModal.classList.toggle('hidden');
    addPicture.classList.toggle('hidden')
    delPicture.classList.toggle('hidden')
    // imagePreview.classList.toggle('hidden');

})
  
  addPicture.addEventListener('click',function(event){
    gallerymodal.classList.toggle('hidden')
    addProjectDiv.classList.toggle('hidden')
    delPicture.classList.toggle('hidden')
    modalTitle.classList.toggle('hidden');
    addPicture.classList.toggle('hidden')
    
    function modifierInput() {
      let inputElement = document.getElementById("project-image");
      let filePreview = document.querySelector(".preview");
      let openFileInputButton = document.getElementById("openFileInput");
      imageDiv.classList.toggle('hidden')
      texteDiv.classList.toggle('hidden')

  
      openFileInputButton.addEventListener("click", function() {
        inputElement.click();
      });
  
      inputElement.addEventListener("change", function() {
        let file = inputElement.files[0];
        let reader = new FileReader();
  
        reader.onload = function() {
          filePreview.innerHTML = '<img src="' + reader.result + '" alt="Aperçu de l\'image">';
        }
  
        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }
  
    document.addEventListener("DOMContentLoaded", modifierInput);
  })
  displayGalleryOnModale(gallerymodal)
  // generateAddImageForm(addProjectDiv);
  
  // showModal(); // Afficher la modale après avoir ajouté les éléments à la galerie
}

async function displayGalleryOnModale (gallerymodal){
  // Supposons que ce code soit à l'intérieur de la boucle qui gère l'ouverture de la modale pour chaque projet
  await getProjects();
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
      button1.setAttribute('class','btn-mouv')
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
  displayProjects()
  displayGalleryOnModale()
})
}

// Définition de la fonction pour générer le formulaire d'ajout d'image
function generateAddImageForm(addProjectDiv) {
  let form = document.createElement('form');
  form.setAttribute('action', ''); // Mettez l'URL de l'API appropriée ici
  form.setAttribute('method', 'POST');
  form.setAttribute('enctype', 'multipart/form-data');
  form.setAttribute('id', 'imageForm');

  let titleLabel = document.createElement('h2');
  titleLabel.textContent = 'Ajout photo';
  titleLabel.classList.add('custom-title');

  let imageLabel = document.createElement('label');
  imageLabel.setAttribute('for', 'project-image');
  

  let imageInput = document.createElement('input');
  imageInput.setAttribute('type', 'file');
  imageInput.setAttribute('id', 'project-image');
  imageInput.setAttribute('name', 'project-image');
  imageInput.setAttribute('accept', 'image/*');
  imageInput.setAttribute('required', 'true');

  let imageIcone = document.createElement('img');
  imageIcone.setAttribute('src', './assets/icons/imagemodale/picture-svgrepo-com 1.png');
  imageIcone.setAttribute('alt', 'Image');

  let texteElement = document.createElement('p');
  texteElement.textContent = 'jpg, png : 4mo max';

  let divImageInput = document.createElement('div')
  divImageInput.setAttribute('id','div-image-input')
  divImageInput.classList.add('container-image-input')

  divImageInput.appendChild(imageIcone)
  divImageInput.appendChild(imageLabel)
  divImageInput.appendChild(imageInput)
  divImageInput.appendChild(texteElement)


  let imagePreview = document.createElement('div')
  imagePreview.setAttribute('id','image-preview')
  imagePreview.classList.add('hidden')

  let nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'project-name');
  nameLabel.textContent = 'Titre :';
  nameLabel.style.marginTop = '30px';

  let nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'project-name');
  nameInput.setAttribute('name', 'project-name');
  // nameInput.setAttribute('onkeyup', 'checkForm()');
  nameInput.setAttribute('required', 'true');
  nameInput.style.fontFamily = 'Syne';
  nameInput.style.fontWeight = '700';
  nameInput.style.margin = '2em auto';
  nameInput.style.width = '190px';
  nameInput.style.height = '30px';
  nameInput.style.borderColor = 'white';
  nameInput.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

  let categoryLabel = document.createElement('label');
  categoryLabel.setAttribute('for', 'category-select');
  categoryLabel.textContent = 'Catégorie :';

  let categorySelect = document.createElement('select');
  categorySelect.setAttribute('id', 'category-select');
  categorySelect.setAttribute('name', 'category-select');
  // categorySelect.setAttribute('onchange', 'checkForm()');
  categorySelect.setAttribute('required', 'true');
  categorySelect.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  categorySelect.style.width = '190px';
  categorySelect.style.height = '30px';
  categorySelect.style.borderColor = 'white';
  categorySelect.style.marginTop = '20px';

  let defaultOption = document.createElement('option');
  defaultOption.setAttribute('value', '');
  defaultOption.textContent = 'Sélectionner une catégorie';
  categorySelect.appendChild(defaultOption);

  let objetsOption = document.createElement('option');
  objetsOption.setAttribute('value', 1);
  objetsOption.textContent = 'Objets';
  categorySelect.appendChild(objetsOption);

  let appartementsOption = document.createElement('option');
  appartementsOption.setAttribute('value', 2);
  appartementsOption.textContent = 'Appartements';
  categorySelect.appendChild(appartementsOption);

  let hotelsOption = document.createElement('option');
  hotelsOption.setAttribute('value', 3);
  hotelsOption.textContent = 'Hotels & restaurants';
  categorySelect.appendChild(hotelsOption);

  let submitButton = document.createElement('button');
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
  // form.appendChild(imageLabel);
  // form.appendChild(imageInput);
  form.appendChild(divImageInput);
  form.appendChild(imagePreview);
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

// // Créer la div de l'image
// let imageDiv = document.createElement('div');
// imageDiv.setAttribute('id', 'imageDiv'); // Ajoutez un ID pour la div
//
// let imageElement = document.createElement('img');
// imageElement.setAttribute('src', './assets/icons/imagemodale/picture-svgrepo-com 1.png');
// imageElement.setAttribute('alt', 'Image');
//
// // Créer la div du texte
// let texteDiv = document.createElement('div');
// texteDiv.setAttribute('id', 'texteDiv'); // Ajoutez un ID pour la div
//
// let texteElement = document.createElement('p');
// texteElement.textContent = 'jpg, png : 4mo max';

// Ajouter l'image à la div de l'image
// imageDiv.appendChild(imageElement);
//
// // Ajouter le texte à la div du texte
// texteDiv.appendChild(texteElement);
//
// // Ajouter les divs au formulaire
// let form = document.getElementById('imageForm');
// form.appendChild(imageDiv);
// form.appendChild(texteDiv);

// Ajout d'un écouteur d'événement pour la soumission du formulaire
const imageForm = document.getElementById("imageForm");

imageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Récupération des données du formulaire
  const imageFile = document.getElementById("project-image").files[0];
  const imageName = document.getElementById("project-name").value;
  const imageCategory = document.getElementById("category-select").value;
  let categoryNumber =  parseInt(imageCategory)
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
  })
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

    let imageInputValue = imageInput.value;
    let nameInputValue = nameSelect.value;
    let categorySelectValue = categorySelect.value;
    
    if (imageInputValue !== '' && nameInputValue !== '') {
      submitButton.removeAttribute('disabled');
      submitButton.style.backgroundColor = '#1D6154';
      submitButton.style.color = 'white'
    } else {
      submitButton.setAttribute('disabled', 'true');
      submitButton.style.backgroundColor = ''; 
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    const imagePreview = document.createElement("div");
    imagePreview.setAttribute("id", "image-preview");
    imagePreview.classList.add("hidden");
    addProjectDiv.appendChild(imagePreview);
    
    // Ajouter l'écouteur d'événement pour le changement de la sélection de fichier
    let imageInput = document.getElementById('project-image');
    imageInput.addEventListener('change', function(event) {
      let imagePreview = document.getElementById('image-preview');
      let imageInput = document.querySelector('#project-image');
    
      let file = event.target.files[0];
      if (file) {
        let reader = new FileReader();
    
        reader.onload = function(e) {
          let img = new Image();
          img.src = e.target.result;
    
          while (imagePreview.firstChild) {
            imagePreview.removeChild(imagePreview.firstChild);
          }
    
          imagePreview.appendChild(img);
        }
    
        reader.readAsDataURL(file);
        imagePreview.classList.remove('hidden');
        imageInput.classList.add('hidden');
        imageDiv.classList.add('hidden')
        texteDiv.classList.add('hidden')
      }
    });
    } )