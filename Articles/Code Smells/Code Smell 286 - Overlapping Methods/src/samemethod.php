<?

class ParentClass {
    private function greet() {
        // This method is private
        return "Hello from ParentClass";
    }

    public function callGreet() {
        return $this->greet();
    }
}

class ChildClass extends ParentClass {
    public function greet() {
        // Overriding a concrete method is a code smell
        // Compilers SHOULD warn you
        return "Hello from ChildClass";
    }
}

$child = new ChildClass();
echo $child->callGreet();

// When callGreet() is invoked on the $child object,
// it executes the following:
// It calls $this->greet(), 
// which refers to the greet() method of ParentClass 
// because the original method is private 
// and cannot be overridden or accessed from ChildClass.

// The unexpected output is 'Hello from ParentClass'