<?php
require_once __DIR__ . '/../config/database.php';

try {
    $database = Database::getInstance();
    $conn = $database->getConnection();
    
    $query = "SELECT * FROM projets";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $count = $stmt->rowCount();
    echo "Total Projects Found: " . $count . "<br><hr>";
    
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "ID: " . $row['id'] . "<br>";
        echo "Titre: " . $row['titre'] . "<br>";
        echo "Etat: " . $row['etat'] . "<br>";
        echo "Visibilite: " . $row['visibilite'] . "<br><br>";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
