<?php
  public function test02SingleDictionaryReturns1AsCount() {
        $words = [new Word('happy')];
        $dictionary = new Dictionary($words);
        $this->assertEquals(1, $dictionary->wordsCount());
   }