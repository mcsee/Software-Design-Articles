<?php 
// https://eratostenes.com/api/v2/primes?limit=10
// NOTICE                     /V2/
// Version 2 is faster!

$requestUri = $_SERVER['REQUEST_URI'];

if (preg_match('#^/v([0-9]+)/#', $requestUri, $matches)) {
    $version = $matches[1];
} else {
    $version = '1';  
}

switch ($version) {
    case '1':
        echo json_encode(['data' => 'Response from API v1']);
        break;
    case '2':
        echo json_encode(['data' => 'Response from API v2']);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unsupported API version']);
}
