import { getCurrentDateTime } from '../utils/dateUtils.js';
import { config } from '../bdd.js';
import { exec } from 'child_process';

export const backup = (req,res)=>{
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
};
