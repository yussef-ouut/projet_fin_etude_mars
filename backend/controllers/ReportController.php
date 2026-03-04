<?php
require_once __DIR__ . '/../models/Report.php';
require_once __DIR__ . '/../utils/JwtUtils.php';
require_once __DIR__ . '/../utils/Security.php';

class ReportController {

    public function getAll() {
        $report = new Report();
        $stmt = $report->read(true); // Validated only for public
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

    public function getByProject($id) {
        $report = new Report();
        $stmt = $report->readByProjet($id);
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

    public function getByStage($id) {
        $report = new Report();
        $stmt = $report->readByStage($id);
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
        $headers = apache_request_headers();
        $authHeader = $headers['Authorization'] ?? '';
        $jwt = str_replace('Bearer ', '', $authHeader);
        $userData = JwtUtils::validate($jwt);

        if (!$userData) {
            Security::jsonResponse(['message' => 'Unauthorized'], 401);
        }

        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->titre) && !empty($data->type)) {
            $report = new Report();
            $report->titre = $data->titre;
            $report->type = $data->type;
            $report->id_etudiant = $userData->data->id;
            $report->id_projet = $data->id_projet ?? null;
            $report->id_stage = $data->id_stage ?? null;

            if($report->create()) {
                Security::jsonResponse(['message' => 'Report submitted.']);
            } else {
                Security::jsonResponse(['message' => 'Unable to submit report.'], 503);
            }
        } else {
            Security::jsonResponse(['message' => 'Incomplete data.'], 400);
        }
    }
}
