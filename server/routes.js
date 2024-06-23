import express, { query } from 'express';
import { bdd, config } from './bdd.js';
import multer from 'multer';
import fs, { readSync } from 'fs';
import {getCurrentDateTime} from './mesFonctions.js';
import { exec } from 'child_process';

export const router = express.Router();

router.get('/', (req, res) => {
    res.send("coucou du serveur");
    res.status(200);
  });
  
router.get('/api/nomCategorie', (req, res) =>{
    bdd.query("select nomCategorie from categorie order by ordreCategorie")
    .then(data => {
        res.end(JSON.stringify(data.rows.map(row => row.nomcategorie)))
    })
    .catch(err => {
        console.error('Erreur lors de la demande d\'accès à collection :', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erreur interne du serveur');
        return;
    })
});

router.get('/api/getIds',(req,res) => {
    bdd.query("select numpeinture from peinture where laCategorie=$1 order by numPeinture;",[req.query.galerieName])
    .then(result =>  res.end(JSON.stringify(result.rows.map((p)=>p.numpeinture)))
    )})

router.get('/api/getDataPeinture',(req,res) => {
    bdd.query("select dataPeinture from peinture where numpeinture=$1;",[req.query.idPaint])
    .then(result =>  res.end(JSON.stringify(result.rows.map((p)=>p.datapeinture)))
    )})

router.get('/api/getDescriptionPeinture',(req,res) => {
    bdd.query("select descriptionPeinture from peinture where numPeinture=$1;",[req.query.idPaint])
    .then(result => {
        res.end(JSON.stringify(result.rows.map(row => row.descriptionpeinture)))
    })
});

router.post('/api/postDescriptionPeinture',(req,res) => {
    const {description, idPaint} = req.body;
    description.replace("'","''")
    const query = `update peinture set descriptionPeinture = $1 where numPeinture = $2 returning descriptionPeinture`;
    bdd.query(query, [description, idPaint])
    res.end();
});
    
const upload = multer({ storage: multer.memoryStorage() });
    

router.post('/api/createImage',upload.single('image'),(req,res)=>{
    const nom = req.body.name;
    const data = req.file.buffer;
    const nomCategorie = req.body.nomCategorie;

    const query = `insert into peinture(nomPeinture, descriptionPeinture, dataPeinture, laCategorie) values ($1, '', $2, $3) returning numPeinture, datapeinture;`
    bdd.query(query, [nom, data, nomCategorie])
    .then(result => {
        console.log(result.rows);
        res.end(JSON.stringify(...result.rows))
        console.log('Image sauvegardé avec succès !');
    })
})

router.delete('/api/deleteImage',(req,res)=>{
    const {idPaint} = req.body;
    const query = `delete from peinture where numPeinture = $1;`
    bdd.query(query, [idPaint])
    
    res.status(200).json({ success: true, message: 'Élément supprimé avec succès' });
})

router.post('/api/changeCategoryName',(req,res)=>{
    const {oldName, newName} = req.body; 

    let query = `alter table peinture drop constraint fkCategorie;`;
    bdd.query(query)
    .then(()=>{
        query = `update categorie set nomCategorie=$1 where nomCategorie=$2;`;
        bdd.query(query, [newName,oldName])
        .then(()=>{
            query = `update peinture set laCategorie=$1 where laCategorie=$2;`;
            bdd.query(query, [newName,oldName])
            .then(()=>{
                query = `alter table peinture add constraint fkCategorie foreign key (laCategorie) references categorie(nomCategorie);`;
                bdd.query(query);
            })
        })
    })

    res.end(); 
})

router.post('/api/addCategoryName',(req,res)=>{
    const {name} = req.body;

    const query=`insert into categorie(nomCategorie) Values($1)`;
    bdd.query(query,[name]);

    res.end();
})

router.post('/api/deleteCategoryName',(req,res)=>{
    const {nomCategorie} = req.body;
    let query=`delete from peinture where laCategorie=$1`;
    bdd.query(query,[nomCategorie])
    .then(()=>{        
        query=`delete from categorie where nomCategorie=$1`;
        bdd.query(query,[nomCategorie]);
    })
    res.end();
})

router.get('/api/backup',(req,res)=>{
    const outputFile = `./server/backup/${getCurrentDateTime()}`;
    const dumpCommand = `pg_dump -U ${ config.user} -h ${config.host} -p ${config.port} -d ${config.database} -F p -v -f ${outputFile} --clean`
    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de l'exécution de la commande : ${error.message}`);
          return res.status(500).send('Erreur lors de la sauvegarde de la base de données');
        }
    
        console.log(`Sauvegarde réussie : ${stdout}`);
        res.end(`Sauvegarde réussie : ${outputFile}`);
    });
})

router.put('/api/changeImageCategory',(req,res)=>{
    const {id, nouvelleCategorie} = req.body;
    const query = "update peinture set laCategorie = $2 where numPeinture = $1";
    bdd.query(query, [id,nouvelleCategorie])
    .then(()=>res.end())
})

router.get('/api/getCategoryDescription',(req,res)=>{
    const categorie = req.query.categorie;
    const query = "select descriptioncategorie from categorie where nomcategorie = $1";
    bdd.query(query, [categorie])
    .then((result) => res.end(JSON.stringify(result.rows.map((row) => row.descriptioncategorie))))
})

router.put('/api/putCategoryDescritpion',(req,res)=>{
    const {description, nomCategorie} = req.body;
    const query = "update categorie set descriptioncategorie=$1 where nomcategorie=$2"
    bdd.query(query, [description, nomCategorie])
    res.end()
})