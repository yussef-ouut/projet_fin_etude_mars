<?php
require_once __DIR__ . '/../models/Project.php';
require_once __DIR__ . '/../utils/JwtUtils.php';
require_once __DIR__ . '/../utils/Security.php';

class ProjectController {

    public function getAll() {
        $project = new Project();
       
        
        $stmt = $project->read(true); // true = public only
        $num = $stmt->rowCount();

        if($num > 0) {
            $projects_arr = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $project_item = [
                    'id' => $id,
                    'titre' => $titre,
                    'description' => $description,
                    'filiere' => $filiere,
                    'annee' => $annee,
                    'etat' => $etat,
                    'visibilite' => $visibilite,
                    'id_etudiant' => $id_etudiant
                ];
                array_push($projects_arr, $project_item);
            }
            Security::jsonResponse($projects_arr);
        } else {
            Security::jsonResponse([]);
        }
    }

    public function create() {
        // Authenticate
        $jwt = JwtUtils::getAuthToken();
        $userData = JwtUtils::validate($jwt);

        if (!$userData) {
            Security::jsonResponse(['message' => 'Unauthorized'], 401);
        }

        $data = json_decode(file_get_contents("php://input"));
        
        // DEBUG: Log received data
        error_log("Project Create Data: " . print_r($data, true));

        if(!empty($data->titre) && !empty($data->description) && !empty($data->filiere)) {
            $project = new Project();
            $project->titre = $data->titre;
            $project->description = $data->description;
            $project->filiere = $data->filiere;
            $project->annee = $data->annee ?? date('Y');
            // $project->etat is now handled in the model (default: attente)
            // Visibilité defaults to public so it appears once approved
            $project->visibilite = 'public'; 
            $project->id_etudiant = $userData->data->id; // From Toekn

            if($project->create()) {
                Security::jsonResponse(['message' => 'Project created.']);
            } else {
                Security::jsonResponse(['message' => 'Unable to create project.'], 503);
            }
        } else {
            Security::jsonResponse(['message' => 'Incomplete data.'], 400);
        }
    }

    public function getOne($id) {
        $project = new Project();
        $project->id = $id;

        if($project->readOne()) {
            $project_item = [
                'id'           => $project->id,
                'titre'        => $project->titre,
                'description'  => $project->description,
                'filiere'      => $project->filiere,
                'annee'        => $project->annee,
                'etat'         => $project->etat,
                'visibilite'   => $project->visibilite,
                'id_etudiant'  => $project->id_etudiant,
                'nom_etudiant' => $project->nom_etudiant,
                'nom_encadrant'=> $project->nom_encadrant,
            ];
            Security::jsonResponse($project_item);
        } else {
            Security::jsonResponse(['message' => 'Project not found.'], 404);
        }
    }
     public function update($id) {
        // Todo: Implement update
         Security::jsonResponse(['message' => 'Not implemented yet'], 501);
    }
     public function delete($id) {
        // Todo: Implement delete
         Security::jsonResponse(['message' => 'Not implemented yet'], 501);
    }
    public function getMine() {
        $jwt = JwtUtils::getAuthToken();
        $userData = JwtUtils::validate($jwt);

        if (!$userData) {
            error_log("Project getMine: Unauthorized (Token: " . ($jwt ? 'present' : 'missing') . ")");
            Security::jsonResponse(['message' => 'Unauthorized'], 401);
        }

        error_log("Project getMine: Fetching for user id " . $userData->data->id);

        $project = new Project();
        $stmt = $project->readByStudent($userData->data->id);
        $num = $stmt->rowCount();

        if($num > 0) {
            $projects_arr = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $project_item = [
                    'id' => $id,
                    'titre' => $titre,
                    'description' => $description,
                    'filiere' => $filiere,
                    'annee' => $annee,
                    'etat' => $etat,
                    'visibilite' => $visibilite,
                    'id_etudiant' => $id_etudiant
                ];
                array_push($projects_arr, $project_item);
            }
            Security::jsonResponse($projects_arr);
        } else {
            Security::jsonResponse([]);
        }
    }
}
