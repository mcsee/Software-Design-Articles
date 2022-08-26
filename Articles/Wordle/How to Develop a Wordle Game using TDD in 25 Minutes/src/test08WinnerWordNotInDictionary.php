<?php 
 public function test08WinnerWordNotInDictionary() {
        $words = [new Word('happy')];
        $dictionary = new Dictionary($words);
        $winnerWord = new Word('heros');
        $this->expectException(\Exception::class);
        $game = new Game($dictionary, $winnerWord);
    }
 
// and add the check...

function __construct(Dictionary $validWords, Word $winnerWord) {
        if (!$validWords->includesWord($winnerWord)) {
            throw new \Exception('Winner word must be in dictionary');
        }
