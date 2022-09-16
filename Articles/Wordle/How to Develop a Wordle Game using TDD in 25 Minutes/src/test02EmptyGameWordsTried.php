<?php

public function test02EmptyGameWordsTried() {
        $game = new Game();
        $this->assertEquals([], $game->wordsTried());
    }

// and the model

function wordsTried(): array {
        return [];
    }
