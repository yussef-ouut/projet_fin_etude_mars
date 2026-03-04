<?php

class JwtUtils {
    
    public static function generate($payload) {
        $secret = $_ENV['JWT_SECRET'] ?? 'change_this_secret_in_production_please_123456789';
        
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
        
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public static function validate($jwt) {
        $secret = $_ENV['JWT_SECRET'] ?? 'change_this_secret_in_production_please_123456789';
        $tokenParts = explode('.', $jwt);
        
        if (count($tokenParts) !== 3) return false;
        
        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signature_provided = $tokenParts[2];
        
        // Check for expiration
        $decodedPayload = json_decode($payload);
        if (!$decodedPayload || !isset($decodedPayload->exp)) return false;
        
        $isTokenExpired = ($decodedPayload->exp - time()) < 0;
        if($isTokenExpired) return false;

        // Build a signature based on the header and payload using the secret
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        // Verify it matches the signature provided in the JWT
        $isSignatureValid = ($base64UrlSignature === $signature_provided);
        
        if ($isSignatureValid) {
            return $decodedPayload;
        } else {
            return false;
        }
    }

    public static function getAuthToken() {
        $authHeader = null;
        
        // Try apache_request_headers
        if (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            // Handle case-insensitivity
            foreach ($headers as $key => $value) {
                if (strtolower($key) === 'authorization') {
                    $authHeader = $value;
                    break;
                }
            }
        }
        
        // Fallback to $_SERVER
        if (!$authHeader) {
            if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
                $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
            } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
                $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
            }
        }
        
        if (!$authHeader) return null;
        
        return str_replace('Bearer ', '', $authHeader);
    }
}
