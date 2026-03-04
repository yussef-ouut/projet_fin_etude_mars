<?php
require_once __DIR__ . '/../config/database.php';

class Report {
    private $conn;
    private $table = 'rapports';

    public $id;
    public $titre;
    public $type;
    public $date_depot;
    public $statut;
    public $id_etudiant;
    // Foreign keys can be null
    public $id_projet;
    public $id_stage;

    public function __construct() {
        $database = Database::getInstance();
        $this->conn = $database->getConnection();
    }

    public function read($validatedOnly = true) {
        $query = 'SELECT * FROM ' . $this->table;
        if ($validatedOnly) {
           $query .= ' WHERE statut = "valide"';
        }
        $query .= ' ORDER BY date_depot DESC';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByProjet($id_projet) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id_projet = ? AND statut = "valide" ORDER BY date_depot DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id_projet);
        $stmt->execute();
        return $stmt;
    }

    public function readByStage($id_stage) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id_stage = ? AND statut = "valide" ORDER BY date_depot DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id_stage);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
            SET titre = :titre, type = :type, date_depot = NOW(), 
                id_etudiant = :id_etudiant, id_projet = :id_projet, id_stage = :id_stage';

        $stmt = $this->conn->prepare($query);

        $this->titre = htmlspecialchars(strip_tags($this->titre));
        
        $stmt->bindParam(':titre', $this->titre);
        $stmt->bindParam(':type', $this->type);
        $stmt->bindParam(':id_etudiant', $this->id_etudiant);
        $stmt->bindParam(':id_projet', $this->id_projet);
        $stmt->bindParam(':id_stage', $this->id_stage);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
