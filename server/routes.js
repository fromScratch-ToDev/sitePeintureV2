import express from 'express';
import { bdd } from './bdd.js';

export const router = express.Router();

router.get('/', (req, res) => {
    res.send("coucou du serveur");
    res.status(200);
  });
  
router.get('/api/nomCollection', (req, res) =>{
    bdd.query("select nomc from collection")
    .then(data => {
        res.end(JSON.stringify(data.rows.map(row => row.nomc)))
    })
    .catch(err => {
        console.error('Erreur lors de la demande d\'accès à collection :', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
        return;
    })
});

router.get('/api/getDescriptionPeinture',(req,res) => {

    bdd.query("select descriptionp from peinture where cheminp='"+req.query.urlPaint+"';")
    .then(result => res.end(JSON.stringify(result.rows.map(row => row.descriptionp))))
});

router.get('/api/getPeintures',(req,res) => {
    bdd.query("select * from peinture, galerie, collection where nomc='"+req.query.galerieName+"' and lacollection=numcollection and lagalerie=numgalerie;")
    .then(result =>  res.end(JSON.stringify(result.rows.map(peinture => peinture.cheminp))));
});
