<?php

function __construct(string $letters) {
        if (strlen($letters) < 5)
            throw new \Exception('Too few letters. Should be 5');
        if (strlen($letters) > 5)
            throw new \Exception('Too many letters. Should be 5');
}