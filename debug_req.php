<?php
$url = 'http://localhost/php/projet-pfe-hub-main/backend/public/api/auth/register';
$data = ['nom' => 'TestDebug', 'email' => 'testdebug@debug.com', 'password' => 'debugpass', 'role' => 'etudiant'];
$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data),
        'ignore_errors' => true
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
echo "RESPONSE_START\n";
echo $result;
echo "\nRESPONSE_END";
?>
