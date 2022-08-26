contract MessageContract {
    string message = "Let's trade";
        
    function sendMessage() public constant {
        this.send(message);
    }
}