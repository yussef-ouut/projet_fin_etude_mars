<?php
require_once __DIR__ . '/../config/database.php';

class Suivi {
    private $conn;
    private $table = 'suivis';

    public $id;
    public $id_etudiant;
    public $id_projet;
    public $id_stage;
    public $pourcentage_avancement;
    public $description_travaux;
    public $date_suivi;
    public $commentaire_encadrant;
    public $statut_validation;

    public function __construct() {
        $database = Database::getInstance();
        $this->conn = $database->getConnection();
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
            SET id_etudiant = :id_etudiant, id_projet = :id_projet, id_stage = :id_stage,
                pourcentage_avancement = :pourcentage_avancement, description_travaux = :description_travaux';

        $stmt = $this->conn->prepare($query);

        $this->description_travaux = htmlspecialchars(strip_tags($this->description_travaux));

        $stmt->bindParam(':id_etudiant', $this->id_etudiant);
        $stmt->bindParam(':id_projet', $this->id_projet);
        $stmt->bindParam(':id_stage', $this->id_stage);
        $stmt->bindParam(':pourcentage_avancement', $this->pourcentage_avancement);
        $stmt->bindParam(':description_travaux', $this->description_travaux);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function readByStudent($studentId) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id_etudiant = ? ORDER BY date_suivi DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $studentId);
        $stmt->execute();
        return $stmt;
    }

    // Update validation (Encadrant only)
    public function validate($suiviId, $status, $comment) {
        $query = 'UPDATE ' . $this->table . ' 
            SET statut_validation = :status, commentaire_encadrant = :comment 
            WHERE id = :id';
        
        $stmt = $this->conn->prepare($query);
        
        $comment = htmlspecialchars(strip_tags($comment));
        
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':comment', $comment);
        $stmt->bindParam(':id', $suiviId);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
