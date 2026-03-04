<!DOCTYPE html>
<html>
<head>
    <title>Database Diagnostic</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .info { background: #f0f0f0; padding: 10px; margin: 10px 0; border-left: 4px solid #333; }
        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        .button { background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin: 5px; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🔍 Database Diagnostic Tool</h1>
    
    <?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    echo "<div class='info'><strong>PHP Version:</strong> " . phpversion() . "</div>";
    
    // Check if .env exists
    $envPath = __DIR__ . '/../.env';
    if (file_exists($envPath)) {
        echo "<p class='success'>✓ .env file exists</p>";
        $envContent = file_get_contents($envPath);
        echo "<pre>" . htmlspecialchars($envContent) . "</pre>";
    } else {
        echo "<p class='error'>✗ .env file NOT found at: $envPath</p>";
    }
    
    // Try direct connection
    echo "<h2>Testing Direct MySQL Connection</h2>";
    try {
        $pdo = new PDO("mysql:host=localhost;charset=utf8", "root", "");
        echo "<p class='success'>✓ MySQL server is running and accessible</p>";
        
        // Check if database exists
        $stmt = $pdo->query("SHOW DATABASES LIKE 'pfe_hub_db'");
        if ($stmt->rowCount() > 0) {
            echo "<p class='success'>✓ Database 'pfe_hub_db' exists</p>";
            
            // Connect to specific database
            $pdo = new PDO("mysql:host=localhost;dbname=pfe_hub_db;charset=utf8", "root", "");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            echo "<h2>Database Tables</h2>";
            $stmt = $pdo->query("SHOW TABLES");
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            if (count($tables) > 0) {
                echo "<ul>";
                foreach ($tables as $table) {
                    $countStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
                    $count = $countStmt->fetch(PDO::FETCH_ASSOC)['count'];
                    echo "<li><strong>$table:</strong> $count records</li>";
                }
                echo "</ul>";
                
                // Show sample data
                echo "<h2>Sample Data</h2>";
                
                // Projects
                echo "<h3>Projects (projets)</h3>";
                $stmt = $pdo->query("SELECT * FROM projets LIMIT 5");
                $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (count($projects) > 0) {
                    echo "<table><tr><th>ID</th><th>Titre</th><th>Filière</th><th>Année</th><th>État</th><th>Image URL</th></tr>";
                    foreach ($projects as $p) {
                        echo "<tr><td>{$p['id']}</td><td>{$p['titre']}</td><td>{$p['filiere']}</td><td>{$p['annee']}</td><td>{$p['etat']}</td><td>{$p['image_url']}</td></tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p class='error'>No projects found!</p>";
                }
                
                // Stages
                echo "<h3>Stages</h3>";
                $stmt = $pdo->query("SELECT * FROM stages LIMIT 5");
                $stages = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (count($stages) > 0) {
                    echo "<table><tr><th>ID</th><th>Entreprise</th><th>Ville</th><th>Année</th><th>État</th><th>Domaine</th></tr>";
                    foreach ($stages as $s) {
                        echo "<tr><td>{$s['id']}</td><td>{$s['entreprise']}</td><td>{$s['ville']}</td><td>{$s['annee']}</td><td>{$s['etat']}</td><td>{$s['domaine']}</td></tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p class='error'>No stages found!</p>";
                }
                
            } else {
                echo "<p class='error'>✗ No tables found in database!</p>";
            }
            
        } else {
            echo "<p class='error'>✗ Database 'pfe_hub_db' does NOT exist</p>";
            echo "<p>You need to create it first. Run setup_db.php</p>";
        }
        
    } catch (PDOException $e) {
        echo "<p class='error'>✗ MySQL Connection Error: " . $e->getMessage() . "</p>";
        echo "<div class='info'>";
        echo "<p><strong>Possible issues:</strong></p>";
        echo "<ul>";
        echo "<li>XAMPP MySQL service is not running - Start it from XAMPP Control Panel</li>";
        echo "<li>Wrong credentials - Check username/password</li>";
        echo "<li>Port conflict - MySQL might be running on a different port</li>";
        echo "</ul>";
        echo "</div>";
    }
    ?>
    
    <hr>
    <h2>Quick Actions</h2>
    <a href="setup_db.php" class="button">Setup Database</a>
    <a href="seed_data.php" class="button">Seed Data</a>
    <a href="api/projets" class="button">View Projects API</a>
    <a href="api/stages" class="button">View Stages API</a>
    <a href="check_status.php" class="button">Refresh Status</a>
    
</body>
</html>
