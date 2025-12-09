<?php

final class McpMessageParser {
    private $raw;
    
    public function parse() {
        // Step 5: Replace the private method call 
        // with the new object
        $stripper = new CharacterStripper($this->raw);
        return $stripper->strip();
    }
}

// CharacterStripper.php
// Step 2: Create a new class (Method Object)
final class CharacterStripper {
    private $input;
    
    // Step 4: Pass all necessary data as constructor 
    // parameters
    public function __construct($input) {
        $this->input = $input;
    }
    
    // Step 3: Move the private method logic 
    // to the new class
    public function strip() {
        return preg_replace(
            '/[^a-zA-Z0-9_:-]/', 
            '', 
            $this->input
        );
    }
}

// CharacterStripperTest.php

use PHPUnit\Framework\TestCase;

final class CharacterStripperTest extends TestCase {
    public function testStripRemovesSpecialChars() {
        $stripper = new CharacterStripper('hello@world#test');
        // No metaprogramming needed
        $this->assertEquals('helloworldtest', $stripper->strip());
    }

    public function testStripKeepsValidCharacters() {
        $stripper = new CharacterStripper('valid_Name-123:test');
        $this->assertEquals(
            'valid_Name-123:test', 
            $stripper->strip()
        );
    }

    public function testStripHandlesEmptyString() {
        $stripper = new CharacterStripper('');
        $this->assertEquals('', $stripper->strip());
    }

    public function testStripRemovesSpaces() {
        $stripper = new CharacterStripper('hello world test');
        $this->assertEquals('helloworldtest', $stripper->strip());
    }

    public function testStripRemovesUnicodeChars() {
        $stripper = new CharacterStripper('café™');
        $this->assertEquals('caf', $stripper->strip());
    }

    public function testStripKeepsUnderscores() {
        $stripper = new CharacterStripper('test_method_name');
        $this->assertEquals(
            'test_method_name', 
            $stripper->strip()
        );
    }

    public function testStripKeepsColons() {
        $stripper = new CharacterStripper('namespace:method');
        $this->assertEquals('namespace:method', $stripper->strip());
    }

    public function testStripKeepsHyphens() {