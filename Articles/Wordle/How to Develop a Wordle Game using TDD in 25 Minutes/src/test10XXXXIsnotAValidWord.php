<?php

  public function test10XXXXIsnotAValidWord() {
        $this->expectException(\Exception::class);
        $wordleWord = new Word('xxxxx');
  }