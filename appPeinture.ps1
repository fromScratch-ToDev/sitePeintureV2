# Libérer les ports 3001 et 3000
try{
     Get-NetTCPConnection -LocalPort 3001 | foreach { get-process -pid $_.OwningProcess | stop-process -Force }
} catch {}


try{
     Get-NetTCPConnection -LocalPort 3000 | foreach { get-process -pid $_.OwningProcess | stop-process -Force }
} catch {}

# Exécution des commandes
Start-Process powershell -ArgumentList "cd C:\Users\thiba\Documents\GitHub\sitePeintureV2; npm run start" -NoNewWindow 
Start-Process powershell -ArgumentList "cd C:\Users\thiba\Documents\GitHub\sitePeintureV2\client; npm run start" -NoNewWindow 