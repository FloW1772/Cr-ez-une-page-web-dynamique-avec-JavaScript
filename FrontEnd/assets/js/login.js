// Fonction pour effectuer la connexion (simulée ici)
function performLogin(username, password) {
  // Remplacez cette partie par votre logique de connexion réelle
  return new Promise((resolve, reject) => {
    // Supposons que le nom d'utilisateur est "admin" et le mot de passe est "12345"
    if (username === "admin" && password === "12345") {
      resolve({ message: "Connexion réussie !" });
    } else {
      reject({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }
  });
}

// Fonction pour stocker le token dans le localStorage
function storeToken(token) {
  localStorage.setItem("userToken", token);
}

// Sélectionner le formulaire et ajouter un gestionnaire d'événement pour la soumission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ 
//vérifier les champs
if(username === ''){

}


fetch ('http://localhost:5678/api/users/login', {
  method:'POST',
  headers:{
    'Accept':"application/json", 
    "Content-Type":'application/json'
  }, 
  body:JSON.stringify({email:username,password:password})
}).then((response) =>response.json)
.then((data)=>{
  //vérifier si l'utilisateur trouvé
  //enregistrer le token dans local storage rediriger vers la page d'acceuil
}).catch((error)=>console.log(error))


  // Appeler la fonction de connexion avec les informations d'identification
  performLogin(username, password)
    .then((response) => {
      alert(response.message); // Connexion réussie, affichez un message approprié
      
      // Supposons que vous avez un jeton d'authentification généré par votre serveur
      const authToken = "votre_token_d_authentification"; // Remplacez-le par votre jeton réel

      // Stocker le token dans le localStorage
      storeToken(authToken);

      // Vous pouvez rediriger l'utilisateur vers une autre page ici
      // window.location.href = "page_de_destination.html";
    })
    .catch((error) => {
      alert(error.message); // Affichez un message d'erreur en cas d'échec de connexion
    });
});

// Récupérer le token du localStorage (peut être fait à n'importe quel moment dans votre script)
const storedToken = localStorage.getItem("userToken");
console.log(storedToken); // Vous pouvez utiliser le token récupéré pour vos actions ultérieures
