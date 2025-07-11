# TestTechnique

Un mini projet développé dans le cadre d’un test technique pour Solyntek.  
Le projet se compose de deux parties :

- **backend/** : API REST en Node.js / Express  
- **frontend/** : interface web en React

🔗 ** Petite Démo en ligne**  
[Voir la démo ici](https://we.tl/t-E0XClrX0nh)

---

## ⚙️ Installation

1. **Cloner le dépôt**  
   ```bash
   git clone https://github.com/DorsafRiahi/TestTechnique.git
   cd TestTechnique
   ```

2. **Backend**  
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```
   - Ouvrez `.env` et renseignez vos variables de connexion à la base de données MySQL :  
     ```
     DB_HOST=localhost
     DB_USER=votre_utilisateur
     DB_PASSWORD=votre_mot_de_passe
     DB_NAME=usercontactdb
     ```
   - Créez la base de données si besoin :  
     ```sql
     CREATE DATABASE usercontactdb;
     ```

3. **Frontend**  
   ```bash
   cd ../frontend
   npm install
   ```

---

## 🚀 Démarrage

Lancez les deux serveurs :

- **Backend**  
  ```bash
  cd backend
  node index.js
  ```
  🚀 Serveur démarré sur le port 5000 : http://localhost:5000/

- **Frontend**  
  ```bash
  cd frontend
  npm start
  ```
  🌐 Application accessible sur : http://localhost:3000/

---

