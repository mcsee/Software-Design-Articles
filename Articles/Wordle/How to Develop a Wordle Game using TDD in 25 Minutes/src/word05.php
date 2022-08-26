<?php

  function __construct(string $letters) {
       if (str_contains($letters,'*')) {
          throw new \Exception('word contain invalid letters');
  }