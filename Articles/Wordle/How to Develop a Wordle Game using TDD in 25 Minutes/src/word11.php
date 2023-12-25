<?php
function matchesPositionWith(Word $anotherWord) : array {
        $positions = [];
        for ($currentPosition = 0; 
             $currentPosition < count($this->letters());
             $currentPosition++) {
            if ($this->letters()[$currentPosition] ==
                $anotherWord->letters()[$currentPosition]) {
                        $positions[] = $currentPosition + 1; 
                // Humans start counting on 1
                // We can implement this better in several other languages
            }
        }
        return $positions;
    }
