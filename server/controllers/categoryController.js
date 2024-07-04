import {bdd} from '../bdd.js'

export const getCategoryNames = (req, res) =>{
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
};
export const addCategoryName = (req,res)=>{
    const {name} = req.body;

    const query=`insert into categorie(nomCategorie) Values($1)`;
    bdd.query(query,[name]);

    res.end();
};
export const deleteCategoryName = (req,res)=>{
    const {nomCategorie} = req.body;
    let query=`delete from peinture where laCategorie=$1`;
    bdd.query(query,[nomCategorie])
    .then(()=>{        
        query=`delete from categorie where nomCategorie=$1`;
        bdd.query(query,[nomCategorie]);
    })
    res.end();
};
export const changeCategoryName = (req,res)=>{
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
};
export const getCategoryDescription = (req,res)=>{
    const categorie = req.query.categorie;
    const query = "select descriptioncategorie from categorie where nomcategorie = $1";
    bdd.query(query, [categorie])
    .then((result) => res.end(JSON.stringify(result.rows.map((row) => row.descriptioncategorie))))
};
export const updateCategoryDescription = (req,res)=>{
    const {description, nomCategorie} = req.body;
    const query = "update categorie set descriptioncategorie=$1 where nomcategorie=$2"
    bdd.query(query, [description, nomCategorie])
    res.end()
};