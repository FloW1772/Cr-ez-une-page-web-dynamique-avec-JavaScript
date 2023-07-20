// main.js
const url = 'https://your-api-url/users/login';

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  // Get the form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Form validation
  if (!email || !password) {
    console.error('Tous les champs sont obligatoires.');
    return;
  }

  // Email validation using regex (simple example)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('L\'email n\'est pas valide.');
    return;
  }

  // Données d'identification de l'utilisateur
  const payload = {
    email: email,
    password: password
  };

  // Options de la requête POST
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  // Envoi de la requête POST
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('La connexion a échoué.');
      }
    })
    .then(data => {
      // La connexion a réussi
      const userId = data.userId;
      const token = data.token;

      // Enregistrement du token en session
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('token', token);

      // Redirection vers la page d'accueil (modifier le chemin en fonction de votre application)
      window.location.href = '/home';
    })
    .catch(error => {
      console.error(error);
    });
});
