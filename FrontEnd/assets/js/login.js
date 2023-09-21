// Sélectionner le formulaire et ajouter un gestionnaire d'événement pour la soumission
const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", function (event) {
  // Empêche l'envoi du formulaire par défaut
  event.preventDefault()
  let connectionError = document.querySelector('#connectionError')
  // Récupérer les valeurs des champs email et password
  const email = document.getElementById("username").value
  const password = document.getElementById("password").value

  // Expression régulière pour valider l'adresse e-mail
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  // Vérifier les champs
  if (email === '') {
    alert("Veuillez saisir une adresse e-mail.")
    return false
  } else if (!emailRegex.test(email)) {
    alert("Veuillez saisir une adresse e-mail valide.")
    return false
  }

  // Vérification du champ "password"
  if (password === '') {
    alert("Veuillez saisir un mot de passe.")
    return false // Empêcher la soumission du formulaire si le champ est vide
  }

  // Envoi de la requête de connexion au serveur
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
    .then((response) => response.json())
    .then((data) => {
      // Le serveur a renvoyé une réponse au format JSON, nous pouvons accéder aux données ici
      if (data && !data.message && !data.error) {
        connectionError.innerText = ''
        // L'utilisateur a été trouvé, enregistrez le jeton dans le stockage local
        localStorage.setItem('token', data.token)

        // Redirigez vers la page d'accueil (ou toute autre page appropriée)
        window.location.href = 'index.html'
      } else {
        // L'utilisateur n'a pas été trouvé, affichez un message d'erreur ou effectuez une autre action appropriée
        console.log('Utilisateur non trouvé.')
        connectionError.innerText = 'Votre Email et/ou votre mot de passe ne sont pas valide'

      }
    })
    .catch((error) => console.log(error))
})
