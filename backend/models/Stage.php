<?php
require_once __DIR__ . '/../config/database.php';

class Stage {
    private $conn;
    private $table = 'stages';

    public $id;
    public $entreprise;
    public $ville;
    public $duree;
    public $description;
    public $domaine;
    public $annee;
    public $visibilite;
    public $id_etudiant;

    public function __construct() {
        $database = Database::getInstance();
        $this->conn = $database->getConnection();
    }

    public function read($publicOnly = true) {
        $query = 'SELECT * FROM ' . $this->table;
        
        $conditions = [];
        if ($publicOnly) {
           // For public view: only approved stages (valide) and visible (public)
           $conditions[] = 'visibilite = "public"';
           $conditions[] = 'etat = "valide"';
        }
        
        if (!empty($conditions)) {
            $query .= ' WHERE ' . implode(' AND ', $conditions);
        }
        
        $query .= ' ORDER BY created_at DESC';

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
            SET entreprise = :entreprise, ville = :ville, duree = :duree, description = :description,
                domaine = :domaine, etat = :etat, annee = :annee, visibilite = :visibilite, id_etudiant = :id_etudiant';

        $stmt = $this->conn->prepare($query);

        $this->entreprise = htmlspecialchars(strip_tags($this->entreprise));
        // ... (other fields sanitization if needed, but simplified here)
        
        $stmt->bindParam(':entreprise', $this->entreprise);
        $stmt->bindParam(':ville', $this->ville);
        $stmt->bindParam(':duree', $this->duree);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':domaine', $this->domaine);
        $stmt->bindParam(':etat', $this->etat);
        $stmt->bindParam(':annee', $this->annee);
        $stmt->bindParam(':visibilite', $this->visibilite);
        $stmt->bindParam(':id_etudiant', $this->id_etudiant);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function readByStudent($id_etudiant) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id_etudiant = :id_etudiant ORDER BY created_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_etudiant', $id_etudiant);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id = ? LIMIT 0,1';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->entreprise = $row['entreprise'];
            $this->ville = $row['ville'];
            $this->duree = $row['duree'];
            $this->description = $row['description'];
            $this->domaine = $row['domaine'];
            $this->etat = $row['etat']; // Added etat
            $this->annee = $row['annee'];
            $this->visibilite = $row['visibilite'];
            $this->id_etudiant = $row['id_etudiant'];
            return true;
        }
        return false;
    }
}
