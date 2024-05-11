import java.util.EmptyStackException;
import java.util.Stack;

public class SchrodingerStack<T> {
    private Stack<T> stack;

    public SchrodingerStack() {
        stack = new Stack<>();
    }

    public void push(T item) {
        stack.push(item);
    }

    public T pop() {
        if (stack.size() == 0) {
            throw new EmptyStackException();
        }

        T item = stack.pop();
        return item;
    }

    public int size() {
        return stack.size();
        // This has O(n) linear time
        // And the stack might not be fully reachable in memory
        // While you wait, the stack isEmpty and notEmpty 
        // at the same time
    }

    public static void main(String[] args) {
        SchrodingerStack<String> stack = new SchrodingerStack<>();

        stack.push("Siamese");
        stack.push("Garfield"); 

        while (stack.size() > 0) {
            System.out.println("Popped element: " + stack.pop());
        }

        if (stack.size() == 0 ) {
            // Less readable
            // violating encapsulation
            // and coupled to the implementation
            System.out.println("The stack is empty.");
        } else {
            System.out.println("The stack is not empty.");
        }
    }
}
