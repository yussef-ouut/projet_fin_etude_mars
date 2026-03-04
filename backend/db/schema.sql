-- Base de données : pfe_hub_db

CREATE DATABASE IF NOT EXISTS pfe_hub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pfe_hub_db;

-- Table UTILISATEUR
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('etudiant', 'encadrant', 'administrateur') NOT NULL DEFAULT 'etudiant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table PROJET
CREATE TABLE IF NOT EXISTS projets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    filiere VARCHAR(100),
    annee YEAR,
    etat ENUM('en_cours', 'termine') DEFAULT 'en_cours',
    visibilite ENUM('public', 'prive') DEFAULT 'prive',
    image_url VARCHAR(255),
    id_etudiant INT NOT NULL,
    id_encadrant INT NULL, -- Ajout pour l'affectation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_etudiant) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (id_encadrant) REFERENCES utilisateurs(id) ON DELETE SET NULL
);

-- Table STAGE
CREATE TABLE IF NOT EXISTS stages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entreprise VARCHAR(255) NOT NULL,
    ville VARCHAR(100),
    duree VARCHAR(50), -- ex: "3 mois"
    annee YEAR,
    visibilite ENUM('public', 'prive') DEFAULT 'prive',
    id_etudiant INT NOT NULL,
    id_encadrant INT NULL, -- Ajout pour l'affectation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_etudiant) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (id_encadrant) REFERENCES utilisateurs(id) ON DELETE SET NULL
);

-- Table RAPPORT
CREATE TABLE IF NOT EXISTS rapports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    type ENUM('projet', 'stage') NOT NULL,
    date_depot DATE,
    statut ENUM('valide', 'non_valide', 'en_attente') DEFAULT 'en_attente',
    id_projet INT NULL,
    id_stage INT NULL,
    id_etudiant INT NOT NULL,
    chemin_fichier VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_projet) REFERENCES projets(id) ON DELETE SET NULL,
    FOREIGN KEY (id_stage) REFERENCES stages(id) ON DELETE SET NULL,
    FOREIGN KEY (id_etudiant) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table SUIVI
CREATE TABLE IF NOT EXISTS suivis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_etudiant INT NOT NULL,
    id_projet INT NULL,
    id_stage INT NULL,
    pourcentage_avancement INT CHECK (pourcentage_avancement BETWEEN 0 AND 100),
    description_travaux TEXT,
    date_suivi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commentaire_encadrant TEXT,
    statut_validation ENUM('valide', 'non_valide', 'en_attente') DEFAULT 'en_attente',
    FOREIGN KEY (id_etudiant) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (id_projet) REFERENCES projets(id) ON DELETE CASCADE,
    FOREIGN KEY (id_stage) REFERENCES stages(id) ON DELETE CASCADE
);

-- Index pour optimiser les recherches
CREATE INDEX idx_projets_visibilite ON projets(visibilite);
CREATE INDEX idx_stages_visibilite ON stages(visibilite);
CREATE INDEX idx_rapports_statut ON rapports(statut);
