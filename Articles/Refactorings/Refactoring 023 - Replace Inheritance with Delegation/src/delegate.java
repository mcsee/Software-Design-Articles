class Brain {
    public String answer(String question) {
        // The common logic to answer questions
        // is extracted into a different object
        return "Thinking... Answering: " + question;
    }
}

final class Chatbot {    
    private final Brain brain;
    
    Chatbot(Brain brain) {
        this.brain = brain;
    }
    
    public void respond(String question) {
        System.out.println(this.brain.answer(question));
    }
}

final class Robot {
    // 4. Remove inheritance and update object creation.
    private final Brain brain;    
    // 1. Create a temporary field in the subclass for the superclass.
    // private final Chatbot chatbot;  
    
    Robot(Brain brain) {
        this.brain = brain;
        // 2. Update subclass methods to delegate calls.
        // this.chatbot = new Chatbot(brain);
        // This code is removed after step 4
    }
    
    public void move() {
        System.out.println("Moving...");
    }
    
    public void grab() {
        System.out.println("Grabbing object...");
    }
    
    public void respond(String question) {
        // 3. Add delegation methods for inherited behavior.
        // chatbot.respond(question);
        // This code is also removed after step 4 
        System.out.println(this.brain.answer(question));
        // The physical robot can also use it as text-to-speech
    }
}