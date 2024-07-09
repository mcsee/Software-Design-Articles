public String handleMicrophoneState(String state) {
    if (state.equals("off")) {
        return "Microphone is off";
    } else {
        return "Microphone is on";
    }
}

/* The constant representing the 'off' state is
duplicated throughout the code, 
increasing the risk of typos and spelling mistakes. 
The "else" condition doesn't explicitly check for the 'on' state;
it implicitly handles any state that is 'not off'. 
This approach leads to repetition of the IF condition
wherever the state needs handling, 
exposing internal representation and violating encapsulation.
The algorithm is not open for extension and closed for modification,
meaning that adding a new state 
will require changes in multiple places in the code. */