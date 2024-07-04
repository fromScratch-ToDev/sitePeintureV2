import { bdd } from '../bdd.js';

export const createImage = (req, res) => {
    const { name, nomCategorie } = req.body;
    const data = req.file.buffer;
    const query = `INSERT INTO peinture(nomPeinture, descriptionPeinture, dataPeinture, laCategorie) VALUES ($1, '', $2, $3) RETURNING numPeinture, datapeinture;`;
    bdd.query(query, [name, data, nomCategorie])
    .then(result => {
        console.log('Image sauvegardée avec succès !');
        res.json(result.rows[0]);
    })
    .catch(err => {
        console.error('Erreur lors de la création de l\'image :', err);
        res.status(500).send('Erreur interne du serveur');
    });
};
export const deleteImage = (req, res) => {
    const { idPaint } = req.body;
    const query = `DELETE FROM peinture WHERE numPeinture = $1;`;
    bdd.query(query, [idPaint])
    .then(() => res.status(200).json({ success: true, message: 'Élément supprimé avec succès' }))
    .catch(err => {
        console.error('Erreur lors de la suppression de l\'image :', err);
        res.status(500).send('Erreur interne du serveur');
    });
};
export const changeImageCategory = (req, res) => {
    const { id, nouvelleCategorie } = req.body;
    const query = "UPDATE peinture SET laCategorie = $2 WHERE numPeinture = $1";
    bdd.query(query, [id, nouvelleCategorie])
    .then(() => res.status(200).end())
    .catch(err => {
        console.error('Erreur lors du changement de catégorie de l\'image :', err);
        res.status(500).send('Erreur interne du serveur');
    });
};
