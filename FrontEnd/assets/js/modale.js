// Fonction pour vérifier si le token est présent dans le Local Storage et s'il correspond à un administrateur
function isAdmin() {
  const token = localStorage.getItem('token');
  console.log(token)
  // Remplacez cette condition par celle que vous utilisez pour vérifier si le token est celui d'un administrateur
  return token !== null && token === localStorage.getItem('userToken'); // Vérifiez si le token correspond à celui précédemment enregistré
}

// Fonction pour activer le mode administrateur
function activerModeAdministrateur() {
  // Mettez ici le code pour activer le mode administrateur, par exemple en affichant des fonctionnalités supplémentaires ou en modifiant l'apparence de l'interface.
  console.log('Mode administrateur activé.');
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
  