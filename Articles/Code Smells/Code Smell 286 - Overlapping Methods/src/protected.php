<?

class ParentClass {
    protected function greet() {
        // notice the 'protected qualifier'
        return "Hello from ParentClass";
    }

    public function callGreet() {
        return $this->greet();
    }
}

class ChildClass extends ParentClass {
    public function greet() {
        return "Hello from ChildClass";
    }
}

$child = new ChildClass();
echo $child->callGreet();

// The output is "Hello from ChildClass"
// This is the standard (and wrong) solution
// Also fixed by most AIs