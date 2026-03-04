<?php
require_once __DIR__ . '/../config/database.php';

class User {
    private $conn;
    private $table = 'utilisateurs';

    public $id;
    public $nom;
    public $email;
    public $mot_de_passe;
    public $role;

    public function __construct() {
        $database = Database::getInstance();
        $this->conn = $database->getConnection();
    }

    // Create User
    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
            SET nom = :nom, email = :email, mot_de_passe = :mot_de_passe, role = :role';

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->nom = htmlspecialchars(strip_tags($this->nom));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->role = htmlspecialchars(strip_tags($this->role));
        // DO NOT sanitize the password hash! It contains special characters like $ and / that must be preserved.

        // Bind data
        $stmt->bindParam(':nom', $this->nom);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':mot_de_passe', $this->mot_de_passe);
        $stmt->bindParam(':role', $this->role);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Find user by email
    public function emailExists() {
        $query = 'SELECT id, nom, mot_de_passe, role FROM ' . $this->table . ' WHERE email = ? LIMIT 0,1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $row['id'];
            $this->nom = $row['nom'];
            $this->mot_de_passe = $row['mot_de_passe'];
            $this->role = $row['role'];
            return true;
        }
        return false;
    }
}
