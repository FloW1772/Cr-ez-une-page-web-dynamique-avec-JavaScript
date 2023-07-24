
// Fonction pour vérifier si l'utilisateur est connecté
function verifierConnexion() {
    // Vérifier si userId et token sont disponibles dans sessionStorage
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
  
    // Si userId et token sont présents, l'utilisateur est considéré comme connecté
    if (userId && token) {
      // Continuer en affichant le contenu de la page ou effectuer d'autres actions pour les utilisateurs connectés
      console.log('L\'utilisateur est connecté.');
      // Ajoutez ici le code pour afficher le contenu pour les utilisateurs connectés
    } else {
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion ou affichez un message
      console.log('L\'utilisateur n\'est pas connecté.');
      // Vous pouvez rediriger l'utilisateur vers la page de connexion en utilisant :
      // window.location.href = '/login';
      // Ou affichez un message lui demandant de se connecter.
    }
  }
  
  // Appeler la fonction verifierConnexion lorsque la page se charge
  document.addEventListener('DOMContentLoaded', verifierConnexion);
  