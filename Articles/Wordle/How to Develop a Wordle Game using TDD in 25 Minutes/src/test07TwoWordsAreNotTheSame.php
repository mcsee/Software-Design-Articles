<?php  

  public function test07TwoWordsAreNotTheSame() {
        $firstWord = new Word('valid');
        $secondWord = new Word('happy');
        $this->assertNotEquals($firstWord, $secondWord);
  }

  public function test08TwoWordsAreTheSame() {
        $firstWord = new Word('valid');
        $secondWord = new Word('valid');
        $this->assertEquals($firstWord, $secondWord);
    }