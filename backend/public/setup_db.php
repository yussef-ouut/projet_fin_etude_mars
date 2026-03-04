<?php
require_once __DIR__ . '/../config/database.php';

echo "<h1>Installation de la Base de Données</h1>";

try {
    $database = Database::getInstance();
    $db = $database->getConnection();
    
    // 1. Table Utilisateurs
    $sql_users = "CREATE TABLE IF NOT EXISTS utilisateurs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        mot_de_passe VARCHAR(255) NOT NULL,
        role ENUM('etudiant', 'encadrant', 'administrateur') DEFAULT 'etudiant',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $db->exec($sql_users);
    echo "<p>✅ Table <code>utilisateurs</code> vérifiée.</p>";

    // 2. Table Projets
    $sql_projects = "CREATE TABLE IF NOT EXISTS projets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        filiere VARCHAR(100) NOT NULL,
        annee YEAR NOT NULL,
        etat ENUM('en_cours', 'validé', 'refusé', 'terminé') DEFAULT 'en_cours',
        visibilite ENUM('public', 'prive') DEFAULT 'prive',
        id_etudiant INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_etudiant) REFERENCES utilisateurs(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $db->exec($sql_projects);
    echo "<p>✅ Table <code>projets</code> vérifiée.</p>";

    // 3. Table Stages
    $sql_stages = "CREATE TABLE IF NOT EXISTS stages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entreprise VARCHAR(255) NOT NULL,
        ville VARCHAR(100),
        duree VARCHAR(50),
        annee YEAR NOT NULL,
        visibilite ENUM('public', 'prive') DEFAULT 'prive',
        id_etudiant INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_etudiant) REFERENCES utilisateurs(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $db->exec($sql_stages);
    echo "<p>✅ Table <code>stages</code> vérifiée.</p>";

    // 4. Table Suivis
    $sql_suivis = "CREATE TABLE IF NOT EXISTS suivis (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_etudiant INT NOT NULL,
        id_projet INT DEFAULT NULL,
        id_stage INT DEFAULT NULL,
        pourcentage_avancement INT DEFAULT 0,
        description_travaux TEXT NOT NULL,
        date_suivi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        commentaire_encadrant TEXT,
        statut_validation ENUM('en_attente', 'valide', 'a_revoir') DEFAULT 'en_attente',
        FOREIGN KEY (id_etudiant) REFERENCES utilisateurs(id) ON DELETE CASCADE,
        FOREIGN KEY (id_projet) REFERENCES projets(id) ON DELETE CASCADE,
        FOREIGN KEY (id_stage) REFERENCES stages(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $db->exec($sql_suivis);
    echo "<p>✅ Table <code>suivis</code> vérifiée.</p>";

    echo "<h3 style='color: green;'>Installation terminée avec succès !</h3>";
    echo "<a href='test_db.php'>Tester la connexion</a>";

} catch(PDOException $e) {
    echo "<h3 style='color: red;'>Erreur : " . $e->getMessage() . "</h3>";
}
