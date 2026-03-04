<?php
require_once __DIR__ . '/../models/Suivi.php';
require_once __DIR__ . '/../utils/JwtUtils.php';
require_once __DIR__ . '/../utils/Security.php';

class SuiviController {

    public function getByStudent() {
        $jwt = JwtUtils::getAuthToken();
        $userData = JwtUtils::validate($jwt);

        if (!$userData) {
            Security::jsonResponse(['message' => 'Unauthorized'], 401);
        }

        $suivi = new Suivi();
        $stmt = $suivi->readByStudent($userData->data->id);
        $num = $stmt->rowCount();

        if($num > 0) {
            $arr = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($arr, $row);
            }
            Security::jsonResponse($arr);
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

        if(!empty($data->description_travaux)) {
            $suivi = new Suivi();
            $suivi->id_etudiant = $userData->data->id;
            $suivi->id_projet = $data->id_projet ?? null;
            $suivi->id_stage = $data->id_stage ?? null;
            $suivi->pourcentage_avancement = $data->pourcentage_avancement ?? 0;
            $suivi->description_travaux = $data->description_travaux;

            if($suivi->create()) {
                Security::jsonResponse(['message' => 'Tracking update created.']);
            } else {
                Security::jsonResponse(['message' => 'Unable to create tracking update.'], 503);
            }
        } else {
            Security::jsonResponse(['message' => 'Incomplete data.'], 400);
        }
    }

    public function validate($id) {
        $jwt = JwtUtils::getAuthToken();
        $userData = JwtUtils::validate($jwt);

        if (!$userData || ($userData->data->role !== 'encadrant' && $userData->data->role !== 'administrateur')) {
            Security::jsonResponse(['message' => 'Unauthorized. Only supervisors/admins can validate.'], 403);
        }

        $data = json_decode(file_get_contents("php://input"));
        
        if(!empty($data->statut) && !empty($data->commentaire)) {
            $suivi = new Suivi();
            if($suivi->validate($id, $data->statut, $data->commentaire)) {
                 Security::jsonResponse(['message' => 'Tracking validated.']);
            } else {
                 Security::jsonResponse(['message' => 'Unable to validate.'], 503);
            }
        } else {
            Security::jsonResponse(['message' => 'Incomplete data.'], 400);
        }
    }
}
