<?php
require_once __DIR__ . '/../config/cors.php';
// Handle CORS immediately
handleCors();

// Log incoming request for debugging
error_log("Incoming API Request: " . $_SERVER['REQUEST_METHOD'] . " " . $_SERVER['REQUEST_URI']);

require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/ProjectController.php';
require_once __DIR__ . '/../controllers/StageController.php';
require_once __DIR__ . '/../controllers/ReportController.php';
require_once __DIR__ . '/../controllers/SuiviController.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// Remove empty elements and re-index
$uri = array_values(array_filter($uri));

// Simple Router
// URI structure expected: /api/{resource}/{id_or_action}

// Find 'api' position
$apiIndex = array_search('api', $uri);

if ($apiIndex !== false) {
    $resource = $uri[$apiIndex + 1] ?? null;
    $action = $uri[$apiIndex + 2] ?? null;
    $id = $uri[$apiIndex + 3] ?? null; // For deeper routes like /validate/id

    // Authentication Routes
    if ($resource === 'auth') {
        $auth = new AuthController();
        if ($action === 'register' && $method === 'POST') {
            $auth->register();
        } elseif ($action === 'login' && $method === 'POST') {
            $auth->login();
        } else {
            header("HTTP/1.1 404 Not Found");
            echo json_encode(['message' => 'Auth route not found']);
        }
    }
    // Project Routes
    elseif ($resource === 'projets') {
        $controller = new ProjectController();
        if ($method === 'GET') {
            if ($action === 'mine') {
                $controller->getMine();
            } elseif ($action) {
                $controller->getOne($action);
            } else {
                $controller->getAll();
            }
        } elseif ($method === 'POST') {
            $controller->create();
        } elseif ($method === 'PUT' && $action) {
            $controller->update($action);
        } elseif ($method === 'DELETE' && $action) {
            $controller->delete($action);
        } else { header("HTTP/1.1 404 Not Found"); }
    }
    // Stage Routes
    elseif ($resource === 'stages') {
         $controller = new StageController();
         if ($method === 'GET') {
             if ($action === 'mine') {
                 $controller->getMine();
             } elseif ($action) {
                 $controller->getOne($action);
             } else {
                 $controller->getAll();
             }
         } elseif ($method === 'POST') {
             $controller->create();
         } else { header("HTTP/1.1 404 Not Found"); }
    }
    // Report Routes
    elseif ($resource === 'rapports') {
         $controller = new ReportController();
         if ($method === 'GET') {
             if ($action === 'projet' && $id) {
                 $controller->getByProject($id);
             } elseif ($action === 'stage' && $id) {
                 $controller->getByStage($id);
             } else {
                 $controller->getAll();
             }
         } elseif ($method === 'POST') {
             $controller->create();
         } else { header("HTTP/1.1 404 Not Found"); }
    }
    // Suivi Routes
    elseif ($resource === 'suivi') {
         $controller = new SuiviController();
         if ($method === 'GET') {
             $controller->getByStudent(); // Currently only gets own student's
         } elseif ($method === 'POST') {
             $controller->create();
         } elseif ($method === 'PUT' && $action === 'validate') {
             // URI: /api/suivi/validate/{id} - Wait, logic above splits differently
             // If URI is like /api/suivi/validate/123
             // $resource = suivi, $action = validate, $uri[3] = id
             $id = $uri[3] ?? null;
             if($id) $controller->validate($id);
             else header("HTTP/1.1 400 Bad Request");
         } else { header("HTTP/1.1 404 Not Found"); }
    }
    else {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(['message' => 'Resource not found']);
    }
} else {
    // Welcome message
    echo json_encode(['message' => 'Welcome to PFE Hub API']);
}
