<?php

  public function test06PointShouldRaiseException() {
        $this->expectException(\Exception::class);
        $wordleWord = new Word('v.lid');
  }

  // Solution

  function __construct(string $letters) {
        if (str_contains($letters, '.'))
            throw new \Exception('word contain invalid letters');
    // ....
  } 
  
