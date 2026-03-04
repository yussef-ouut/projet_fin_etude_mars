<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/Security.php';
require_once __DIR__ . '/../utils/JwtUtils.php'; // We will create this next

class AuthController {

    public function register() {
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->nom) && !empty($data->email) && !empty($data->password)) {
            $user = new User();
            $user->nom = trim($data->nom);
            $user->email = trim($data->email);
            $user->mot_de_passe = Security::hashPassword(trim($data->password));
            $user->role = $data->role ?? 'etudiant'; // Default to student

            try {
                // Check if user exists
                if($user->emailExists()) {
                    Security::jsonResponse(['message' => 'Cet email est déjà utilisé.'], 400);
                    return;
                }

                if($user->create()) {
                    // Auto-login: Get user details (ID) to generate token
                    $user->emailExists(); 
                    
                    $payload = [
                        'iss' => $_ENV['APP_URL'] ?? 'http://localhost',
                        'iat' => time(),
                        'exp' => time() + (60*60*24), // 24 hours
                        'data' => [
                            'id' => $user->id,
                            'nom' => $user->nom,
                            'email' => $user->email,
                            'role' => $user->role
                        ]
                    ];

                    $jwt = JwtUtils::generate($payload);

                    Security::jsonResponse([
                        'message' => 'Compte créé avec succès !',
                        'token' => $jwt,
                        'user' => [
                            'id' => $user->id,
                            'nom' => $user->nom,
                            'role' => $user->role
                        ]
                    ]);
                } else {
                    Security::jsonResponse(['message' => 'Erreur lors de la création de l\'utilisateur.'], 503);
                }
            } catch (PDOException $e) {
                Security::jsonResponse(['message' => 'Erreur de base de données : ' . $e->getMessage()], 500);
            } catch (Exception $e) {
                Security::jsonResponse(['message' => 'Erreur système : ' . $e->getMessage()], 500);
            }
        } else {
            Security::jsonResponse(['message' => 'Données incomplètes (nom, email, mot de passe requis).'], 400);
        }
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->email) && !empty($data->password)) {
            $user = new User();
            $user->email = trim($data->email);

            if($user->emailExists()) {
                $verification = Security::verifyPassword(trim($data->password), $user->mot_de_passe);
                
                // DEBUGGING: Remove in production
                error_log("Login Attempt: " . $data->email);
                error_log("Input Password: " . $data->password);
                error_log("Stored Hash: " . $user->mot_de_passe);
                error_log("Verification Result: " . ($verification ? 'TRUE' : 'FALSE'));

                if($verification) {
                    $payload = [
                        'iss' => $_ENV['APP_URL'] ?? 'http://localhost',
                        'iat' => time(),
                        'exp' => time() + (60*60*24), // 24 hours
                        'data' => [
                            'id' => $user->id,
                            'nom' => $user->nom,
                            'email' => $user->email,
                            'role' => $user->role
                        ]
                    ];

                $jwt = JwtUtils::generate($payload);

                Security::jsonResponse([
                    'message' => 'Connexion réussie',
                    'token' => $jwt,
                    'user' => [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'role' => $user->role
                    ]
                ]);
            } else {
                Security::jsonResponse(['message' => 'Email ou mot de passe incorrect.'], 401);
            }
        } else {
            Security::jsonResponse(['message' => 'Email ou mot de passe incorrect.'], 401);
        }
        } else {
            Security::jsonResponse(['message' => 'Données incomplètes.'], 400);
        }
    }
}
