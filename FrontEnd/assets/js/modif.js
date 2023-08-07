// Fonction pour vérifier si le token est présent dans le Local Storage et s'il correspond à un administrateur
function isAdmin() {
  const token = localStorage.getItem('token');
  console.log(token);
  // Remplacez cette condition par celle que vous utilisez pour vérifier si le token est celui d'un administrateur
  return token !== null && token === localStorage.getItem('userToken'); // Vérifiez si le token correspond à celui précédemment enregistré
}

// Fonction pour activer le mode administrateur
function activerModeAdministrateur() {
  // Mettez ici le code pour activer le mode administrateur, par exemple en affichant des fonctionnalités supplémentaires ou en modifiant l'apparence de l'interface.
  console.log('Mode administrateur activé.');
}

// Ajouter la barre noire en modifiant le style de la page
const blackBar = document.createElement("div");
blackBar.style.position = "fixed";
blackBar.style.top = "0";
blackBar.style.left = "0";
blackBar.style.width = "100%";
blackBar.style.height = "2px";
blackBar.style.backgroundColor = "black";

// Récupérer tous les boutons existants sur la page
const allButtons = document.querySelectorAll('button');

// Parcourir les boutons et les rendre invisibles
allButtons.forEach(button => {
  button.style.display = 'none';
});

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

// Vérifiez si l'utilisateur est un administrateur et activez le mode administrateur si c'est le cas
if (isAdmin()) {
  activerModeAdministrateur();
}

// document.getElementById("modifier-icon").addEventListener("click", function() {
//     document.getElementById("modal").style.display = "block";
//   });
  
//   document.getElementById("close-modal").addEventListener("click", function() {
//     document.getElementById("modal").style.display = "none";
//   });
  