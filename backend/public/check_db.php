<?php
header('Content-Type: application/json');
include_once '../config/Database.php';

try {
    $database = Database::getInstance();
    $db = $database->getConnection();

    $query = "SELECT * FROM stages";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $count = $stmt->rowCount();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "count" => $count,
        "data" => $data
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
