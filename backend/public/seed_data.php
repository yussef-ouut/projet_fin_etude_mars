<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "Starting data seeding...<br>";

// 1. Load credentials manually
$host = 'localhost';
$db_name = 'pfe_hub_db';
$username = 'root';
$password = '';

if (file_exists(__DIR__ . '/../../.env')) {
    $lines = file(__DIR__ . '/../../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $name = trim($parts[0]);
            $value = trim($parts[1]);
            if ($name === 'DB_HOST') $host = $value;
            if ($name === 'DB_NAME') $db_name = $value;
            if ($name === 'DB_USER') $username = $value;
            if ($name === 'DB_PASS') $password = $value;
        }
    }
}

try {
    $dsn = "mysql:host=$host;dbname=$db_name;charset=utf8";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to database.<br>";

    // 2. Create Tables if not exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        prenom VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('etudiant', 'enseignant', 'administrateur') DEFAULT 'etudiant',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");
    echo "Table 'users' checked/created.<br>";

    $pdo->exec("CREATE TABLE IF NOT EXISTS projets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        filiere VARCHAR(255),
        annee INT,
        etat ENUM('attente', 'valide', 'refuse') DEFAULT 'attente',
        visibilite ENUM('public', 'prive') DEFAULT 'prive',
        id_etudiant INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_etudiant) REFERENCES users(id) ON DELETE CASCADE
    )");
    echo "Table 'projets' checked/created.<br>";

    // Ensure stages has domaine, description, and status (etat)
    $pdo->exec("CREATE TABLE IF NOT EXISTS stages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        entreprise VARCHAR(255) NOT NULL,
        ville VARCHAR(255),
        duree VARCHAR(255),
        description TEXT,
        domaine VARCHAR(255) DEFAULT 'Informatique',
        etat ENUM('attente', 'valide', 'refuse') DEFAULT 'attente',
        annee INT,
        visibilite ENUM('public', 'prive') DEFAULT 'prive',
        id_etudiant INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_etudiant) REFERENCES users(id) ON DELETE CASCADE
    )");
    echo "Table 'stages' checked/created.<br>";
    
    // Auto-update schema for existing tables
    try {
        $pdo->exec("ALTER TABLE stages ADD COLUMN IF NOT EXISTS domaine VARCHAR(255) DEFAULT 'Informatique'");
        $pdo->exec("ALTER TABLE stages ADD COLUMN IF NOT EXISTS description TEXT");
        $pdo->exec("ALTER TABLE stages ADD COLUMN IF NOT EXISTS etat ENUM('attente', 'valide', 'refuse') DEFAULT 'attente'");
        // Fix Project ENUM if it was created with accents
        $pdo->exec("ALTER TABLE projets MODIFY COLUMN etat ENUM('attente', 'valide', 'refuse') DEFAULT 'attente'");
        // Add image_url column to projets if it doesn't exist
        $pdo->exec("ALTER TABLE projets ADD COLUMN IF NOT EXISTS image_url VARCHAR(255)");
        echo "Schema updated for 'stages' and 'projets'.<br>";
    } catch (Exception $e) { /* Ignore if exists */ }

    // 3. Ensure User ID 1 exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE id = 1");
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        echo "User ID 1 not found. Creating default student user...<br>";
        $password_hash = password_hash('password123', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (id, nom, prenom, email, password, role) VALUES (1, 'Etudiant', 'Test', 'etudiant@test.com', ?, 'etudiant')");
        $stmt->execute([$password_hash]);
        echo "Created User ID 1.<br>";
    } else {
        echo "User ID 1 exists.<br>";
    }

    // 4. Seed Data
    
    // Clear old data
    $pdo->exec("DELETE FROM projets");
    $pdo->exec("DELETE FROM stages");
    echo "Cleared old data.<br>";

    // Seed Projects - 6 diverse projects
    $projects = [
        [
            'titre' => 'Plateforme E-learning avec Intelligence Artificielle',
            'description' => 'Développement d\'une plateforme d\'apprentissage en ligne intégrant des recommandations personnalisées basées sur l\'IA. Technologies: React, Python, TensorFlow, PostgreSQL.',
            'filiere' => 'DWFS',
            'annee' => 2024,
            'etat' => 'valide',
            'visibilite' => 'public',
            'image_url' => 'gradient-purple',
            'id_etudiant' => 1
        ],
        [
            'titre' => 'Application Mobile de Gestion de Stock',
            'description' => 'Application mobile cross-platform pour la gestion des stocks en temps réel avec synchronisation cloud. Technologies: Flutter, Firebase, Node.js.',
            'filiere' => 'DWFS',
            'annee' => 2024,
            'etat' => 'valide',
            'visibilite' => 'public',
            'image_url' => 'gradient-blue',
            'id_etudiant' => 1
        ],
        [
            'titre' => 'Système de Reconnaissance Faciale',
            'description' => 'Implémentation d\'un système de reconnaissance faciale pour le contrôle d\'accès avec apprentissage profond. Technologies: Python, OpenCV, TensorFlow, AWS.',
            'filiere' => 'EII',
            'annee' => 2023,
            'etat' => 'valide',
            'visibilite' => 'public',
            'image_url' => 'gradient-green',
            'id_etudiant' => 1
        ],
        [
            'titre' => 'Marketplace B2B pour Artisans',
            'description' => 'Plateforme de mise en relation entre artisans marocains et acheteurs professionnels internationaux. Technologies: Next.js, Stripe, MongoDB, Tailwind.',
            'filiere' => 'CG',
            'annee' => 2023,
            'etat' => 'valide',
            'visibilite' => 'public',
            'image_url' => 'gradient-orange',
            'id_etudiant' => 1
        ],
        [
            'titre' => 'Système IoT pour Agriculture Intelligente',
            'description' => 'Solution IoT complète pour l\'irrigation automatisée et le monitoring des cultures agricoles. Technologies: Arduino, ESP32, MQTT, React Native.',
            'filiere' => 'EII',
            'annee' => 2024,
            'etat' => 'valide',
            'visibilite' => 'public',
            'image_url' => 'gradient-teal',
            'id_etudiant' => 1
        ],
        [
            'titre' => 'Chatbot Médical avec NLP',
            'description' => 'Assistant virtuel médical utilisant le traitement du langage naturel pour orienter les patients. Technologies: Python, NLTK, Rasa, Docker.',
            'filiere' => 'CG',
            'annee' => 2024,
            'etat' => 'valide',
            'visibilite' => 'public',
            'image_url' => 'gradient-pink',
            'id_etudiant' => 1
        ]
    ];

    $stmt = $pdo->prepare("INSERT INTO projets (titre, description, filiere, annee, etat, visibilite, image_url, id_etudiant) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($projects as $p) {
        $stmt->execute([$p['titre'], $p['description'], $p['filiere'], $p['annee'], $p['etat'], $p['visibilite'], $p['image_url'], $p['id_etudiant']]);
        echo "Inserted Project: {$p['titre']}<br>";
    }

    // Seed Stages (6 items)
    $stages = [
        [
            'entreprise' => 'OCP Group',
            'ville' => 'Casablanca',
            'duree' => '6 mois',
            'domaine' => 'DWFS',
            'description' => 'Participation à la digitalisation des processus RH. Développement d\'une application web pour la gestion des ressources humaines. Technologies: React, Node.js, PostgreSQL.',
            'annee' => 2024,
            'visibilite' => 'public',
            'etat' => 'valide',
            'id_etudiant' => 1
        ],
        [
            'entreprise' => 'INWI',
            'ville' => 'Rabat',
            'duree' => '4 mois',
            'domaine' => 'CG',
            'description' => 'Analyse des données clients pour améliorer la rétention. Création de tableaux de bord décisionnels. Technologies: Python, Power BI, SQL.',
            'annee' => 2024,
            'visibilite' => 'public',
            'etat' => 'valide',
            'id_etudiant' => 1
        ],
        [
            'entreprise' => 'Attijariwafa Bank',
            'ville' => 'Casablanca',
            'duree' => '6 mois',
            'domaine' => 'EII',
            'description' => 'Audit de sécurité et mise en place de solutions de protection des données bancaires sensibles. Technologies: Kali Linux, Wireshark, Python.',
            'annee' => 2023,
            'visibilite' => 'public',
            'etat' => 'valide',
            'id_etudiant' => 1
        ],
        [
            'entreprise' => 'Renault Group',
            'ville' => 'Tanger',
            'duree' => '5 mois',
            'domaine' => 'GMP',
            'description' => 'Optimisation des robots d\'assemblage et maintenance prédictive.',
            'annee' => 2024,
            'visibilite' => 'public',
            'etat' => 'valide',
            'id_etudiant' => 1
        ],
        [
            'entreprise' => 'CGI',
            'ville' => 'Fès',
            'duree' => '6 mois',
            'domaine' => 'DWFS',
            'description' => 'Mise en place de pipelines CI/CD et containerisation des applications critiques. Technologies: Docker, Kubernetes, Jenkins.',
            'annee' => 2023,
            'visibilite' => 'public',
            'etat' => 'valide',
            'id_etudiant' => 1
        ],
        [
            'entreprise' => 'Capgemini',
            'ville' => 'Marrakech',
            'duree' => '6 mois',
            'domaine' => 'DWFS',
            'description' => 'Développement de modèles de machine learning pour la prédiction de tendances touristiques. Technologies: Python, TensorFlow, AWS.',
            'annee' => 2024,
            'visibilite' => 'public',
            'etat' => 'valide',
            'id_etudiant' => 1
        ]
    ];

    $stmtStage = $pdo->prepare("INSERT INTO stages (entreprise, ville, duree, description, annee, visibilite, id_etudiant, domaine, etat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($stages as $s) {
        $stmtStage->execute([$s['entreprise'], $s['ville'], $s['duree'], $s['description'], $s['annee'], $s['visibilite'], $s['id_etudiant'], $s['domaine'], $s['etat']]);
        echo "Inserted Stage: {$s['entreprise']} ({$s['domaine']})<br>";
    }

    echo "<br><b>Seeding Complete!</b>";

} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>
