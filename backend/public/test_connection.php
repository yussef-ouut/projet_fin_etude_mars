<?php
header("Content-Type: application/json");
require_once __DIR__ . '/../config/database.php';

try {
    $db = Database::getInstance();
    $conn = $db->getConnection();
    
    // Check if tables exist
    $stmt = $conn->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo json_encode([
        "status" => "success",
        "message" => "Connected successfully to the database.",
        "database" => "pfe_hub_db",
        "tables_found" => $tables
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $e->getMessage(),
        "advice" => "Make sure XAMPP (Apache & MySQL) is running and the database 'pfe_hub_db' exists."
    ]);
}
