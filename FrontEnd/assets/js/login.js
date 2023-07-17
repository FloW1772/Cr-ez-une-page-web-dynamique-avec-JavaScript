const fetch = require('node-fetch');

const url = 'https://your-api-url/users/login';

// Données d'identification de l'utilisateur
const payload = {
  email: 'string',
  password: 'string'
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
    console.log(`Utilisateur connecté avec succès. ID utilisateur: ${userId}, Token: ${token}`);
  })
  .catch(error => {
    console.error(error);
  });
