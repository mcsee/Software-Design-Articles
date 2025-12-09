<?php

final class McpMessageParser {
    private $raw;

    public function parse() {
        return $this->stripStrangeCharacters($this->raw);
    }

    // This is the private method me need to test 
    // For several different scenarios
    // Simplified here
    private function stripStrangeCharacters($input) {
        return preg_replace('/[^a-zA-Z0-9_:-]/', '', $input);
    }
}