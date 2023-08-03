// // Fonction pour effectuer la connexion (simulée ici)
// function performLogin(username, password) {
//   // Remplacez cette partie par votre logique de connexion réelle
//   return new Promise((resolve, reject) => {
//     // Supposons que le nom d'utilisateur est "admin" et le mot de passe est "12345"
//     if (email === "admin" && password === "12345") {
//       resolve({ message: "Connexion réussie !" });
//     } else {
//       reject({ message: "Nom d'utilisateur ou mot de passe incorrect." });
//     }
//   });
// }




// Sélectionner le formulaire et ajouter un gestionnaire d'événement pour la soumission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Vérifier les champs
  if (email === '') {
    alert("Veuillez saisir une adresse e-mail.");
    return false; // Empêcher la soumission du formulaire si le champ est vide
  } else if (!emailRegex.test(email)) {
    alert("Veuillez saisir une adresse e-mail valide.");
    return false; // Empêcher la soumission du formulaire si l'adresse e-mail est invalide
  }

  // Vérification du champ "password"
  if (password === '') {
    alert("Veuillez saisir un mot de passe.");
    return false; // Empêcher la soumission du formulaire si le champ est vide
  }

  // Si tout est correct, le formulaire peut être soumis

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
    console.log(data)
    // Le serveur a renvoyé une réponse au format JSON, nous pouvons accéder aux données ici
    if (data && !data.message) {
      debugger
      // L'utilisateur a été trouvé, enregistrez le jeton dans le stockage local
      localStorage.setItem('token', data.token);

     

      // Redirigez vers la page d'accueil (ou toute autre page appropriée)
      window.location.href = 'http://127.0.0.1:5500/FrontEnd/index.html'; // Remplacez '/accueil' par l'URL de votre page d'accueil
    } else {
      // L'utilisateur n'a pas été trouvé, affichez un message d'erreur ou effectuez une autre action appropriée
      console.log('Utilisateur non trouvé.');
      // div vides message d'errreur
    }
  })
  .catch((error) => console.log(error));
});





//   // Appeler la fonction de connexion avec les informations d'identification
//   performLogin(username, password)
//     .then((response) => {
//       alert(response.message); // Connexion réussie, affichez un message approprié
      
//       // Supposons que vous avez un jeton d'authentification généré par votre serveur
//       const authToken = "votre_token_d_authentification"; // Remplacez-le par votre jeton réel

//       // Stocker le token dans le localStorage
//       storeToken(authToken);

//       // Vous pouvez rediriger l'utilisateur vers une autre page ici
//       // window.location.href = "page_de_destination.html";
//     })
//     .catch((error) => {
//       alert(error.message); // Affichez un message d'erreur en cas d'échec de connexion
//     });
// });

// // Récupérer le token du localStorage (peut être fait à n'importe quel moment dans votre script)
// const storedToken = localStorage.getItem("userToken");
// console.log(storedToken); // Vous pouvez utiliser le token récupéré pour vos actions ultérieure)
