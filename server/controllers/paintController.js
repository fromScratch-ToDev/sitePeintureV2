import { bdd } from '../bdd.js';

export const getPaintIds = (req,res) => {
    bdd.query("select numpeinture from peinture where laCategorie=$1 order by ordrePeinture;",[req.query.galerieName])
    .then(result =>  res.end(JSON.stringify(result.rows.map((p)=>p.numpeinture)))
)};
export const getPaintData = (req,res) => {
    bdd.query("select dataPeinture from peinture where numpeinture=$1;",[req.query.idPaint])
    .then(result =>  res.end(JSON.stringify(result.rows.map((p)=>p.datapeinture)))
)};
export const getPaintDescription = (req,res) => {
    bdd.query("select descriptionPeinture from peinture where numPeinture=$1;",[req.query.idPaint])
    .then(result => {
        res.end(JSON.stringify(result.rows.map(row => row.descriptionpeinture)))
    })
};
export const postPaintDescription = (req,res) => {
    const {description, idPaint} = req.body;
    description.replace("'","''")
    const query = `update peinture set descriptionPeinture = $1 where numPeinture = $2 returning descriptionPeinture`;
    bdd.query(query, [description, idPaint])
    res.end();
};
export const modifyPaintOrder = (req,res) => {
    const {paintIds} = req.body;
    paintIds.forEach((id, index) => {
        const query = `update peinture set ordrePeinture = $1 where numPeinture = $2`;
        bdd.query(query, [index, id])
    });
    res.end()
}