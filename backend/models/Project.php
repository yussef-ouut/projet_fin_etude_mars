<?php
require_once __DIR__ . '/../config/database.php';

class Project {
    private $conn;
    private $table = 'projets';

    public $id;
    public $titre;
    public $description;
    public $filiere;
    public $annee;
    public $etat;
    public $visibilite;
    public $image_url;
    public $id_etudiant;
    public $nom_etudiant;
    public $nom_encadrant;

    public function __construct() {
        $database = Database::getInstance();
        $this->conn = $database->getConnection();
    }

    public function read($publicOnly = true) {
        $query = 'SELECT * FROM ' . $this->table;
        
        $conditions = [];
        if ($publicOnly) {
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

    public function readByStudent($id_etudiant) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id_etudiant = :id_etudiant ORDER BY created_at DESC';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_etudiant', $id_etudiant);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = 'INSERT INTO ' . $this->table . ' 
            SET titre = :titre, description = :description, filiere = :filiere, 
                annee = :annee, etat = :etat, visibilite = :visibilite, id_etudiant = :id_etudiant';

        $stmt = $this->conn->prepare($query);

        
        $this->titre = htmlspecialchars(strip_tags($this->titre));
        $this->description = htmlspecialchars(strip_tags($this->description));
        
        
        $this->etat = $this->etat ?? 'attente';

        $stmt->bindParam(':titre', $this->titre);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':filiere', $this->filiere);
        $stmt->bindParam(':annee', $this->annee);
        $stmt->bindParam(':etat', $this->etat);
        $stmt->bindParam(':visibilite', $this->visibilite);
        $stmt->bindParam(':id_etudiant', $this->id_etudiant);

        try {
            if($stmt->execute()) {
                return true;
            }
            error_log("Project Create Execute Failed: " . print_r($stmt->errorInfo(), true));
        } catch (PDOException $e) {
            error_log("Project Create Exception: " . $e->getMessage());
        }
        return false;
    }

    public function readOne() {
        $query = 'SELECT p.*, 
                         etudiant.nom as nom_etudiant,
                         encadrant.nom as nom_encadrant
                  FROM ' . $this->table . ' p
                  LEFT JOIN utilisateurs etudiant ON p.id_etudiant = etudiant.id
                  LEFT JOIN utilisateurs encadrant ON p.id_encadrant = encadrant.id
                  WHERE p.id = ? LIMIT 0,1';

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->titre        = $row['titre'];
            $this->description  = $row['description'];
            $this->filiere      = $row['filiere'];
            $this->annee        = $row['annee'];
            $this->etat         = $row['etat'];
            $this->visibilite   = $row['visibilite'];
            $this->id_etudiant  = $row['id_etudiant'];
            $this->nom_etudiant = $row['nom_etudiant'] ?? null;
            $this->nom_encadrant = $row['nom_encadrant'] ?? null;
            return true;
        }
        return false;
    }
}
