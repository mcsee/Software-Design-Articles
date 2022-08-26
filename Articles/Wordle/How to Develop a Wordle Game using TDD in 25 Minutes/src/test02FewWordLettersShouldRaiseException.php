<?php 

  public function test02FewWordLettersShouldRaiseException() {
        $this->expectException(\Exception::class);
        new Word('vali');
  }