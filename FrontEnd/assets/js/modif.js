// Fonction pour vérifier si le token est présent dans le Local Storage et s'il correspond à un administrateur
function isAdmin() {
  const token = localStorage.getItem('token');
  return token !== null && token === localStorage.getItem('token'); // Remplacez 'administrateur_token' par la valeur réelle du token administrateur
}

// Fonction pour activer le mode administrateur
function activerModeAdministrateur() {
  // Ajouter la barre noire en modifiant le style de la page
  const iconElement = document.createElement("i");
  iconElement.className = "far fa-pen-to-square";

  // Ajouter l'élément <i> à l'intérieur de la div appropriée
  const blackBar = document.querySelector(".black-bar");
  blackBar.appendChild(iconElement);

  // Supprimer la classe "hidden" pour afficher l'icône
  blackBar.classList.remove("hidden");

  // Récupérer tous les boutons existants sur la page
  const allCategoriesFilters = document.querySelector('.categories-filters');

  // Rendre les boutons invisibles
  allCategoriesFilters.style.display = 'none';

  // Rendre invisible le lien "Login"
  const loginLink = document.querySelector('li a[href="http://127.0.0.1:5500/FrontEnd/login.html"]');
  loginLink.style.display = 'none';

  // Rendre visible le lien "Logout"
  const logoutLink = document.querySelector('li a[href="#"]');
  logoutLink.style.display = 'block';

  // Ajouter un gestionnaire d'événement pour le lien "Logout"
  logoutLink.addEventListener('click', deconnexion);

  // Fonction pour gérer la déconnexion
  function deconnexion() {
    // Mettez ici le code pour effectuer la déconnexion, par exemple en supprimant le token du Local Storage et en redirigeant vers la page de connexion.
    localStorage.removeItem('token');
    window.location.href = 'http://127.0.0.1:5500/FrontEnd/login.html'; // Rediriger vers la page de connexion
  }
  
  // Mettez ici le code pour activer le mode administrateur, par exemple en affichant des fonctionnalités supplémentaires ou en modifiant l'apparence de l'interface.
  console.log('Mode administrateur activé.');
}

// Vérifiez si l'utilisateur est un administrateur et activez le mode administrateur si c'est le cas
if (isAdmin()) {
  console.log("Mode administrateur activé.");
  activerModeAdministrateur();
}
