<?php 

public function test04DictionaryIncludesWord() {
  $words = [new Word('happy')];
  $dictionary = new Dictionary($words);
  $this->assertTrue($dictionary->includesWord(new Word('happy')));
}

function includesWord(Word $subjectToSearch): bool {
  return in_array($subjectToSearch, $this->words);
}