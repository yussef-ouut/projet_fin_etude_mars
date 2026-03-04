<?php
require_once __DIR__ . '/../models/Stage.php';
require_once __DIR__ . '/../utils/JwtUtils.php';
require_once __DIR__ . '/../utils/Security.php';

class StageController {

    public function getAll() {
        $stage = new Stage();
        $stmt = $stage->read(true);
        $num = $stmt->rowCount();

        if($num > 0) {
            $stages_arr = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($stages_arr, $row);
            }
            Security::jsonResponse($stages_arr);
        } else {
            Security::jsonResponse([]);
        }
    }

    public function create() {
        $jwt = JwtUtils::getAuthToken();
        $userData = JwtUtils::validate($jwt);

        if (!$userData) {
            Security::jsonResponse(['message' => 'Unauthorized'], 401);
        }

        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->entreprise)) {
            $stage = new Stage();
            $stage->entreprise = $data->entreprise;
            $stage->ville = $data->ville ?? '';
            $stage->duree = $data->duree ?? '';
            $stage->description = $data->description ?? '';
            $stage->domaine = $data->domaine ?? 'General';
            $stage->annee = $data->annee ?? date('Y');
            $stage->visibilite = 'public'; // Default to public for approval workflow
            $stage->etat = 'attente'; // Default status for new submissions
            $stage->id_etudiant = $userData->data->id;

            if($stage->create()) {
                Security::jsonResponse(['message' => 'Internship created.']);
            } else {
                Security::jsonResponse(['message' => 'Unable to create internship.'], 503);
            }
        } else {
            Security::jsonResponse(['message' => 'Incomplete data.'], 400);
        }
    }

    public function getOne($id) {
        $stage = new Stage();
        $stage->id = $id;

        if($stage->readOne()) {
            $stage_item = [
                'id' => $stage->id,
                'entreprise' => $stage->entreprise,
                'ville' => $stage->ville,
                'duree' => $stage->duree,
                'description' => $stage->description,
                'domaine' => $stage->domaine,
                'annee' => $stage->annee,
                'visibilite' => $stage->visibilite,
                'id_etudiant' => $stage->id_etudiant,
                'etat' => $stage->etat // Added etat field
            ];
            Security::jsonResponse($stage_item);
        } else {
            Security::jsonResponse(['message' => 'Stage not found.'], 404);
        }
    }
    public function getMine() {
        $jwt = JwtUtils::getAuthToken();
        $userData = JwtUtils::validate($jwt);

        if (!$userData) {
            Security::jsonResponse(['message' => 'Unauthorized'], 401);
        }

        $stage = new Stage();
        $stmt = $stage->readByStudent($userData->data->id);
        $num = $stmt->rowCount();

        if($num > 0) {
            $stages_arr = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($stages_arr, $row);
            }
            Security::jsonResponse($stages_arr);
        } else {
            Security::jsonResponse([]);
        }
    }
}
