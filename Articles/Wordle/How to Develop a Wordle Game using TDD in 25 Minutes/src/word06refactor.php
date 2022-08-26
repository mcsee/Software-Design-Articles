<?php

  function __construct(string $letters) {
        if (!\preg_match('/^[a-z]+$/i', $letters)) {
            throw new \Exception('word contain invalid letters');
      }
    // ..