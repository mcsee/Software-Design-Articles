<?php

  public function test04EmptyLettersShouldRaiseException() {
        $this->expectException(\Exception::class);
        $wordleWord = new Word('');
  }