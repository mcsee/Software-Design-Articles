class Chatbot {    
    public void respond(String question) {
        // Here is the logic to answer a question
    }
}

class Robot extends Chatbot {
    // The Physical Robot inherits the logic
    // to answer questions
    // and adds physical behavior
    public void move() {
        System.out.println("Moving...");
    }
    
    public void grab() {
        System.out.println("Grabbing object...");
    }
}