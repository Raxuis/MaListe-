:: Pensez à lancer votre service mysql pour accéder à la base de données et à modifier les informations de connexion à la BDD dans le fichier .env du dossier API.
@echo off
start cmd /k "pnpm run dev"
start cmd /k "cd api && php leaf serve"
exit