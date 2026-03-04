<?php
require_once __DIR__ . '/../config/database.php';

$database = Database::getInstance();
$db = $database->getConnection();

echo "--- Utilisateurs ---\n";
$stmt = $db->query("SELECT id, nom, email, role FROM utilisateurs");
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));

echo "\n--- Projets ---\n";
$stmt = $db->query("SELECT id, titre, id_etudiant, etat FROM projets");
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
