import express from 'express';
import { bdd } from './bdd.js';

    
// Créer une application express
const app = express();

// Définir le port sur lequel le serveur écoutera
const port = 3001;

// Servir les fichiers statiques du dossier 'public'
app.use(express.static('public'));

// Définir une route GET
app.get('/', (req, res) => {
  res.send("coucou du serveur");
  res.status(200);
});

app.get('/bdd', (req, res) =>{
  bdd.query("select nomc from collection")
  .then(data => {
    res.end(JSON.stringify(data.rows))
  })
  .catch(err => {
    console.error('Erreur lors de la demande d\'accès à collection :', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erreur interne du serveur');
    return;
  })
});

// Le serveur écoute sur le port défini
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
