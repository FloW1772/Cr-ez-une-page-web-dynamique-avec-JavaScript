// Fonction pour vérifier si le token est présent dans le Local Storage et s'il correspond à un administrateur
function isAdmin() {
  const token = localStorage.getItem('token')
  return token !== null && token === localStorage.getItem('token')
}

// Fonction pour activer le mode administrateur
function activerModeAdministrateur() {
  // Supprimer la classe "hidden" pour afficher la barre noire
  const blackBar = document.querySelector(".black-bar")
  blackBar.classList.remove("hidden")
}

// Fonction pour gérer la déconnexion
function deconnexion() {
  // Mettez ici le code pour effectuer la déconnexion, par exemple en supprimant le token du Local Storage et en redirigeant vers la page de connexion.
  localStorage.removeItem('token')
  window.location.href = 'login.html'
}

// Récupérer tous les boutons existants sur la page
const allCategoriesFilters = document.querySelector('.categories-filters')

// Rendre les boutons invisibles
allCategoriesFilters.style.display = 'none'

// Rendre invisible le lien "Login"
const loginLink = document.querySelector('li a[href="login.html"]')
loginLink.style.display = 'none'

// Rendre visible le lien "Logout"
const logoutLink = document.querySelector('li a[href="#"]')
logoutLink.style.display = 'block'

// Ajouter un gestionnaire d'événement pour le lien "Logout"
logoutLink.addEventListener('click', deconnexion)

// Rendre visible "categories-filters"
categoriesFilters.style.display = 'block'

// Rendre invisible le lien "Logout"
logoutLink.style.display = 'none'
loginLink.style.display = 'block'


// Vérifiez si l'utilisateur est un administrateur et activez le mode administrateur si c'est le cas
if (isAdmin()) {
  console.log("Mode administrateur activé.")
  activerModeAdministrateur()
  categoriesFilters.style.display = 'none'

  loginLink.style.display = 'none'
  logoutLink.style.display = 'block'
}
