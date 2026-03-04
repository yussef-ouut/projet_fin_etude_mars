<?php
header('Content-Type: text/html; charset=UTF-8');

echo "<h2>Checking Database Status</h2>";

require_once __DIR__ . '/../config/database.php';

try {
    $database = Database::getInstance();
    $db = $database->getConnection();
    
    echo "<p style='color: green;'>✓ Database connected successfully</p>";
    
    // Check projects
    $stmt = $db->query("SELECT COUNT(*) as count FROM projets");
    $projectCount = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    echo "<p><strong>Projets:</strong> $projectCount records</p>";
    
    if ($projectCount > 0) {
        $stmt = $db->query("SELECT id, titre, filiere, annee FROM projets LIMIT 5");
        echo "<ul>";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<li>ID {$row['id']}: {$row['titre']} ({$row['filiere']}, {$row['annee']})</li>";
        }
        echo "</ul>";
    }
    
    // Check stages
    $stmt = $db->query("SELECT COUNT(*) as count FROM stages");
    $stageCount = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    echo "<p><strong>Stages:</strong> $stageCount records</p>";
    
    if ($stageCount > 0) {
        $stmt = $db->query("SELECT id, entreprise, ville, annee FROM stages LIMIT 5");
        echo "<ul>";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            echo "<li>ID {$row['id']}: {$row['entreprise']} ({$row['ville']}, {$row['annee']})</li>";
        }
        echo "</ul>";
    }
    
    echo "<hr>";
    echo "<p><a href='seed_data.php'>Re-run Seed Script</a></p>";
    echo "<p><a href='api/projets'>View Projects API</a> | <a href='api/stages'>View Stages API</a></p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Error: " . $e->getMessage() . "</p>";
}
?>
