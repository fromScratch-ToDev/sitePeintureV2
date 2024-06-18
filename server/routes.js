import express from 'express';
import { bdd } from './bdd.js';
import multer from 'multer';
import fs from 'fs';

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

router.get('/api/getDescriptionPeinture',(req,res) => {
    console.log(req.query.urlPaint);
    bdd.query("select descriptionPeinture from peinture where cheminPeinture=$1;",[req.query.urlPaint])
    .then(result => res.end(JSON.stringify(result.rows.map(row => row.descriptionpeinture))))
});

router.get('/api/getPeintures',(req,res) => {
    bdd.query("select * from peinture where laCategorie=$1 order by numPeinture;",[req.query.galerieName])
    .then(result =>  res.end(JSON.stringify(result.rows.map(peinture => peinture.cheminpeinture))));
});

router.post('/api/postDescriptionPeinture',(req,res) => {
    const {description, urlPaint} = req.body;
    description.replace("'","''")

    const query = `update peinture set descriptionPeinture = $1 where cheminPeinture = $2`;
    bdd.query(query, [description, urlPaint]);
    console.log(req.body);
    res.end();
});

let destination = "./server/images/";

const storage = multer.diskStorage({
        destination: (req, file, callback) => {
        callback(null, destination);
        },
        filename: (req, file, callback) => {
        
        const name = Buffer.from(Date.now()+file.originalname, 'latin1').toString('utf8');
        callback(null, name);
    }
    }); 
    
const upload = multer({storage: storage});
    
router.post('/api/setStorage',(req, res)=>{
    const {nomCategorie} = req.body;
    destination = "./server/images/"+nomCategorie;
    res.end();
    console.log("Nom du dossier de réception paramétré");
})

router.post('/api/createImage',upload.single('image'),(req,res)=>{
    const nom = req.body.name;
    const url = req.file.path.replace("server","");
    const nomCategorie = req.body.nomCategorie;

    const query = `insert into peinture(nomPeinture, descriptionPeinture, cheminPeinture, laCategorie) values ($1, '', $2, $3);`
    bdd.query(query, [nom, url, nomCategorie])
    console.log('Fichier téléchargé avec succès !');
    res.end(JSON.stringify(url));
})

router.delete('/api/deleteImage',(req,res)=>{
    const {urlPeinture} = req.body;
    const query = `delete from peinture where cheminPeinture = $1;`
    bdd.query(query, [urlPeinture])
    .then(result => {
        if (result.rowCount > 0) {
            fs.unlink("server"+urlPeinture,()=>console.log("suppression de l'image réussi"))
        }
    })
    res.status(200).json({ success: true, message: 'Élément supprimé avec succès' });
})

router.post('/api/changeCategoryName',(req,res)=>{
    const {oldName, newName} = req.body; 
    const oldFolderName = "./server/images/"+oldName;
    const newFolderName = "./server/images/"+newName;

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

    fs.renameSync(oldFolderName, newFolderName);

    res.end(); 
})

router.post('/api/addCategoryName',(req,res)=>{
    const {name} = req.body;

    const query=`insert into categorie(nomCategorie) Values($1)`;
    bdd.query(query,[name]);

    fs.mkdirSync("./server/images/"+name)

    res.end();
})

router.post('/api/deleteCategoryName',(req,res)=>{
    const {nomCategorie} = req.body;
    let query=`delete from peinture where laCategorie=$1`;
    bdd.query(query,[nomCategorie])
    .then(()=>{        
        query=`delete from categorie where nomCategorie=$1`;
        bdd.query(query,[nomCategorie]);
    }).then(()=>{
        fs.rm(`./server/images/${nomCategorie}`,{recursive:true},(err)=>{
            if(err) {
                console.log("erreur lors de la suppression du dossier")
            }
        });
    })


    res.end();
})