// Fonction pour vérifier si l'utilisateur est un administrateur
function isAdmin() {
  // Ajoutez votre logique de vérification pour les administrateurs ici
}

// Fonction pour basculer la visibilité d'un élément
function toggleVisibility(element) {
  element.classList.toggle('hidden');
}

// Gestionnaire d'événements pour le bouton "retour en arrière"
function onReturnBackButtonClick() {
  toggleVisibility(addProject);
  modalContainerGallery.classList.remove('hidden');
  addPicture.classList.toggle('hidden');
  delPicture.classList.toggle('hidden');
  modalTitle.classList.toggle('hidden');
}

// Gestionnaire d'événements pour le bouton "modifier"
function onModifyButtonClick(event) {
  myModal.classList.toggle('hidden');
  addPicture.classList.toggle('hidden');
  delPicture.classList.toggle('hidden');
}

// Gestionnaire d'événements pour l'élément "background-gray"
function onBackgroundGrayClick(event) {
  myModal.classList.toggle('hidden');
  addPicture.classList.toggle('hidden');
  delPicture.classList.toggle('hidden');
}

// Gestionnaire d'événements pour le bouton de fermeture de la modale
function onCloseModalButtonClick(event) {
  myModal.classList.toggle('hidden');
  addPicture.classList.toggle('hidden');
  delPicture.classList.toggle('hidden');
}

// Fonction pour afficher les projets dans la modale
async function displayGalleryOnModal(gallerymodal) {
  await getProjects(); // Appel à une fonction asynchrone pour obtenir les projets
  console.log(projects); // Affiche les projets dans la console (à des fins de débogage)

  // Boucle à travers les projets récupérés
  for (let project of projects) {
    let figure = document.createElement('figure'); // Crée un élément de type "figure" (image avec légende)

    // ... (Le reste du code pour créer et personnaliser la figure)

    gallerymodal.appendChild(figure); // Ajoute la figure à la galerie modale

    // Crée et configure le premier bouton
    let button1 = document.createElement('button');
    button1.innerHTML = `<i class="fa-solid fa-up-down-left-right"></i>`;
    button1.setAttribute('class','btn-mouv'); // Ajoute une classe CSS au bouton
    button1.addEventListener('click', () => {
      // Code à exécuter lorsque le bouton 1 est cliqué
    });
    figure.appendChild(button1); // Ajoute le bouton à la figure

    // ... (De manière similaire, créez et configurez le bouton2)

    figure.appendChild(button2); // Ajoute le bouton à la figure
  }
}

// Fonction pour supprimer un projet
async function deleteProject(id) {
  try {
    const token = localStorage.getItem('token'); // Récupère le jeton d'authentification de la mémoire locale
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE", // Utilise la méthode HTTP DELETE pour supprimer le projet
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        "accept": "*/*",
        'authorization': `Bearer ${token}` // Ajoute le jeton d'authentification dans les en-têtes de la requête
      }
    });

    if (response.ok) {
      displayProjects(); // Rafraîchit l'affichage des projets après la suppression
      displayGalleryOnModal(); // Rafraîchit la galerie modale après la suppression
    } else {
      console.log('Erreur :', response.statusText);
    }
  } catch (error) {
    console.error('Erreur :', error);
  }
}

// ... (Autres fonctions)

// Ajoute des écouteurs d'événements si l'utilisateur est un administrateur
if (isAdmin()) {
  returnBackButton.addEventListener('click', onReturnBackButtonClick);
  modifyBtn.addEventListener('click', onModifyButtonClick);
  backgroundgray.addEventListener('click', onBackgroundGrayClick);
  closeModalButton.addEventListener('click', onCloseModalButtonClick);
  // ... (Ajoutez d'autres écouteurs d'événements si nécessaire)
}
