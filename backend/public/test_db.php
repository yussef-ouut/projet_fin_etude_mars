<?php
require_once __DIR__ . '/../config/database.php';

echo "<h1>Test de Connexion Base de Données</h1>";

try {
    $database = Database::getInstance();
    $db = $database->getConnection();
    echo "<p style='color: green; font-weight: bold;'>✅ Connexion réussie à la base de données !</p>";
    
    // Test table users
    $query = "SELECT count(*) as count FROM utilisateurs";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo "<p>Nombre d'utilisateurs actuels : <strong>" . $row['count'] . "</strong></p>";
    
} catch(Exception $e) {
    echo "<p style='color: red; font-weight: bold;'>❌ Erreur de connexion : " . $e->getMessage() . "</p>";
    echo "<p>Vérifiez votre fichier <code>.env</code> ou <code>backend/config/database.php</code>.</p>";
}
