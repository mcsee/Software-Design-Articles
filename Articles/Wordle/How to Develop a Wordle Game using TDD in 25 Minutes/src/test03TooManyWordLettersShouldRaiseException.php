<?php 
  public function test03TooManyWordLettersShouldRaiseException() {
        $this->expectException(\Exception::class);
        new Word('toolong');
  }