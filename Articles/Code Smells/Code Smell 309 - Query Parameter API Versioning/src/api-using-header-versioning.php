<?php
// Header-based API versioning example

// GET /api/primes?limit=12 HTTP/1.1
// Host: eratostenes.com
// Accept: application/vnd.myapi.v2+json
// NOTICE THE HEADER             V2  

$acceptHeader = $_SERVER['HTTP_ACCEPT'] ?? '';

if (preg_match('#application/vnd\.myapi\.v(\d+)\+json#', 
    $acceptHeader, $matches)) {
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
