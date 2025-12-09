<?php

use PHPUnit\Framework\TestCase;

final class McpMessageParserTest extends TestCase {
    private function invokePrivateMethod(
        $object, 
        $methodName, 
        array $parameters = []
    ) {
        $reflection = new ReflectionClass(get_class($object));
        // This is metaprogramming.
        // That generates fragile and hidden dependencies
        // You need to avoid it
        $method = $reflection->getMethod($methodName);
        $method->setAccessible(true);
        return $method->invokeArgs($object, $parameters);
    }

    public function testStripStrangeCharactersRemovesSpecialChars() {
        $parser = new McpMessageParser();
        $result = $this->invokePrivateMethod(
            $parser, 
            'stripStrangeCharacters', 
            ['hello@world#test']
        );
        $this->assertEquals('helloworldtest', $result);
    }

    public function testStripStrangeCharactersKeepsValidCharacters() {
        $parser = new McpMessageParser();