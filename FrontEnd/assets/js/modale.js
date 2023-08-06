// Fonction pour vérifier si le token est présent dans le Local Storage et s'il correspond à un administrateur
function isAdmin() {
  const token = localStorage.getItem('token');
  return token !== null && token === localStorage.getItem('userToken'); // Vérifiez si le token correspond à celui précédemment enregistré
}

// Fonction pour activer le mode administrateur
function activerModeAdministrateur() {
  // Mettez ici le code pour activer le mode administrateur, par exemple en affichant des fonctionnalités supplémentaires ou en modifiant l'apparence de l'interface.
  console.log('Mode administrateur activé.');

  // Modifier le texte du lien "Login" en "Logout"
  const authLink = document.getElementById('authLink');
  if (authLink) {
    authLink.textContent = 'Logout';
  }
}

// Fonction pour gérer la déconnexion
function deconnexion() {
  localStorage.removeItem('token'); // Supprimer le token de connexion
  location.reload(); // Recharger la page pour appliquer les changements
}

// Vérifiez si l'utilisateur est un administrateur et activez le mode administrateur si c'est le cas
if (isAdmin()) {
  activerModeAdministrateur();
}

// Ajouter un gestionnaire d'événement pour le lien de connexion/déconnexion
const authLink = document.getElementById('authLink');
if (authLink) {
  authLink.addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    
    if (isAdmin()) {
      deconnexion(); // Si l'utilisateur est un administrateur, déconnectez-le
    } else {
      // Mettez ici le code pour le processus de connexion si nécessaire
    }
  });
}


// document.getElementById("modifier-icon").addEventListener("click", function() {
//     document.getElementById("modal").style.display = "block";
//   });
  
//   document.getElementById("close-modal").addEventListener("click", function() {
//     document.getElementById("modal").style.display = "none";
//   });
  