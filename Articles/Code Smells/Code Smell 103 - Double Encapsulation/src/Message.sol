contract MessageContract {
    string message = "Let's trade";
    
    function getMessage() public constant returns(string) {
        return message;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    function sendMessage() public constant {
        this.send(this.getMessage());
        // We can access property but make a self call instead
    }
}