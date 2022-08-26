<?php

    public function test06TryToPlayInvalid() {
        $words = [new Word('happy')];
        $dictionary = new Dictionary($words);
        $game = new Game($dictionary);
        $this->expectException(\Exception::class);
        $game->addtry(new Word('xxxxx'));
    }