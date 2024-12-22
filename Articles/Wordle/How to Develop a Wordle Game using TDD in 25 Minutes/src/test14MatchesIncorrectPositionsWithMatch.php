<?php
public function test14MatchesIncorrectPositionsWithMatch() {
        $firstWord = new Word('alarm');
        $secondWord = new Word('drama');
        $this->assertEquals([3], 
            $firstWord->matchesPositionWith($secondWord));
        $this->assertEquals([1, 4, 5], 
            $firstWord->matchesIncorrectPositionWith($secondWord));
        // A*ARM vs *RAMA
        $this->assertEquals
            ([3],
            $secondWord->matchesPositionWith($firstWord));
        $this->assertEquals([2, 4, 5],
            $secondWord->matchesIncorrectPositionWith($firstWord));
    }

// The complicated solution

function matchesIncorrectPositionWith(Word $anotherWord) : array {
        $positions = [];
        // count($this->letters() is always 5,
        // but you don't want to add a magic number here
        for ($currentPosition = 0;
             $currentPosition < count($this->letters()); 
             $currentPosition++) {
            if (in_array(
                    $this->letters()[$currentPosition],
                    $anotherWord->letters())) {
                $positions[] = $currentPosition + 1; 
                // Humans start counting on 1
                // You can implement this better
                // in several other languages
            }
        }
        return array_values(
                array_diff(
                    $positions, 
                    $this->matchesPositionWith($anotherWord)));
    }