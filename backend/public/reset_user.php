<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "Starting reset process...\n<br>";

// 1. Load credentials manually
$host = 'localhost';
$db_name = 'pfe_hub_db';
$username = 'root';
$password = '';

if (file_exists(__DIR__ . '/../../.env')) {
    $lines = file(__DIR__ . '/../../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        if ($name === 'DB_HOST') $host = $value;
        if ($name === 'DB_NAME') $db_name = $value;
        if ($name === 'DB_USER') $username = $value;
        if ($name === 'DB_PASS') $password = $value;
    }
}

// 2. Connect
try {
    $dsn = "mysql:host=$host;dbname=$db_name;charset=utf8";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to database.\n<br>";
} catch (PDOException $e) {
    die("Connection Failed: " . $e->getMessage());
}

// 3. Update
$target_email = "youssef@gmail.com";
$target_pass = "youssef123.";
$target_hash = password_hash($target_pass, PASSWORD_BCRYPT);
$target_id = 1;

try {
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM utilisateurs WHERE id = ?");
    $stmt->execute([$target_id]);
    
    if ($stmt->rowCount() > 0) {
        $update = $pdo->prepare("UPDATE utilisateurs SET email = ?, mot_de_passe = ? WHERE id = ?");
        $update->execute([$target_email, $target_hash, $target_id]);
        echo "SUCCESS: Updated user ID 1 credentials.\n<br>";
    } else {
        // Create
        $insert = $pdo->prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES ('Youssef', ?, ?, 'etudiant')");
        $insert->execute([$target_email, $target_hash]);
        echo "SUCCESS: Created new user.\n<br>";
    }
    
    echo "---------------------------------\n<br>";
    echo "Login: $target_email\n<br>";
    echo "Pass: $target_pass\n<br>";
    echo "---------------------------------\n<br>";

} catch (PDOException $e) {
    echo "Query Failed: " . $e->getMessage();
}
?>
