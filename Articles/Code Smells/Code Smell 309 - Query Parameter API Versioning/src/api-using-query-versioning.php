<?php

// Misusing query parameters for versioning
// https://eratostenes.com/api/primes?limit=10&version=2
// Version 2 is faster!

$version = $_GET['version'] ?? '1';

if ($version === '1') {
    echo json_encode(['data' => 'Response from API v1']);
} elseif ($version === '2') {
    echo json_encode(['data' => 'Response from API v2']);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unsupported API version']);
}

// This handling with IF/Switches is another code smell
