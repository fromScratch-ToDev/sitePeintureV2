export function getCurrentDateTime() {
    const now = new Date();
    
    // Récupération des composants de la date
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = now.getFullYear();
    
    // Récupération des composants de l'heure
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Construction de la chaîne de date et heure
    const formattedDateTime = `${day}-${month}-${year}_${hours}h${minutes}.sql`;
    
    return formattedDateTime;
}
