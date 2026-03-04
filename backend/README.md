# Backend PFE Hub

API PHP pour la gestion des projets et stages de fin d'étude.

## Prérequis
- PHP 7.4 ou supérieur
- MySQL ou MariaDB
- Serveur Web (Apache ou Nginx) ou serveur interne PHP
- Extension PDO MySQL activée

## Installation

1. **Base de données**
   - Créez une nouvelle base de données (ex: `pfe_hub_db`).
   - Importez le fichier `backend/db/schema.sql` pour créer les tables.

2. **Configuration**
   - Copiez le fichier `.env.example` vers `.env`.
   - Modifiez `.env` avec vos accès base de données :
     ```ini
     DB_HOST=localhost
     DB_NAME=pfe_hub_db
     DB_USER=root
     DB_PASS=votre_mot_de_passe
     JWT_SECRET=votre_secret_securise
     ```

3. **Lancement (Développement)**
   - Vous pouvez utiliser le serveur interne de PHP pour tester rapidement :
   ```sh
   cd backend/public
   php -S localhost:8000
   ```
   - L'API sera accessible sur `http://localhost:8000/api`.

## Endpoints API

### Authentification
- `POST /api/auth/register` : Inscription
- `POST /api/auth/login` : Connexion (Retourne un Token JWT)

### Projets
- `GET /api/projets` : Liste des projets publics
- `POST /api/projets` : Créer un projet (Auth requis)

### Stages
- `GET /api/stages` : Liste des stages
- `POST /api/stages` : Ajouter un stage (Auth requis)

### Rapports
- `GET /api/rapports` : Liste des rapports validés
- `POST /api/rapports` : Déposer un rapport (Auth requis)

### Suivi
- `GET /api/suivi` : Voir ses suivis (Auth requis)
- `POST /api/suivi` : Ajouter un avancement (Auth requis)
- `PUT /api/suivi/validate/{id}` : Valider un suivi (Admin/Encadrant requis)

## Sécurité
- Les mots de passe sont hachés avec `password_hash` (Bcrypt).
- Les routes sensibles vérifient le Token JWT dans le header `Authorization: Bearer <token>`.
- Les entrées sont nettoyées pour éviter les injections XSS/SQL.
- CORS est activé pour permettre les requêtes depuis le frontend.
