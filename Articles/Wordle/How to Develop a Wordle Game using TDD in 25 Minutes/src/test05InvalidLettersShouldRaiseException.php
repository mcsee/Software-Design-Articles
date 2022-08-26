<?php

  public function test05InvalidLettersShouldRaiseException() {
        $this->expectException(\Exception::class);
        $wordleWord = new Word('vali*');
  }