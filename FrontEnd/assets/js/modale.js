// Récupérez l'élément lien
const openModalLink = document.getElementById('openModalLink');

// Ajoutez un gestionnaire d'événements de clic au lien
openModalLink.addEventListener('click', () => {
  // Vous devrez modifier 'projects' pour faire référence à votre tableau de projets
  for (let project of projects) {
    openModal(project.imageUrl);
  }
});
