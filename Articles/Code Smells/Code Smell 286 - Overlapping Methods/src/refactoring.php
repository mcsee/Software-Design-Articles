<?

abstract class ParentClass {
    // Declare greet() as an abstract method
    // Following the template-method design pattern
    abstract protected function greet();

    public function callGreet() {
        return $this->greet();
    }
}

class ChildClass extends ParentClass {
    protected function greet() {
        return "Hello from ChildClass";
    }
}

class OtherChild extends ParentClass {
    protected function greet() {
        return "Hello from OtherChild";
    }
}

$child = new ChildClass();
echo $child->callGreet(); // Output: Hello from ChildClass

$otherChild = new OtherChild();
echo $otherChild->callGreet(); // Output: Hello from OtherChild
