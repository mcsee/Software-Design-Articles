// Step 1: Find or Create a Polymorphic Hierarchy

abstract class MicrophoneState { }
final class On extends MicrophoneState { }
final class Off extends MicrophoneState { }

// Step 2: Move the Body of Each IF to the Corresponding Abstraction

abstract class MicrophoneState {
    public abstract String polymorphicMethodFromIf();
}

final class On extends MicrophoneState {
    @Override
    public String polymorphicMethodFromIf() {
        return "Microphone is on";
    }
}

final class Off extends MicrophoneState {
    @Override
    public String polymorphicMethodFromIf() {
        return "Microphone is off";
    }
}

// Step 3: Name the Abstractions

abstract class MicrophoneState {}
final class MicrophoneStateOn extends MicrophoneState {}
final class MicrophoneStateOff extends MicrophoneState {}

// Step 4: Name the Method

abstract class MicrophoneState {
   public abstract String handle();
}

final class MicrophoneStateOn extends MicrophoneState {
    @Override
    String handle() {
        return "Microphone is on";
    }
}

final class MicrophoneStateOff extends MicrophoneState {
    @Override
    String handle() {
        return "Microphone is off";
    }
}

// Step 5: Replace if Statements with Polymorphic Message Sends

 public String handleMicrophoneState(String state) {
        Map<String, MicrophoneState> states = new HashMap<>();
        states.put("muted", new Muted());
        states.put("recording", new Recording());
        states.put("idle", new Idle());

        MicrophoneState microphoneState = 
            states.getOrDefault(state, new NullMicrophoneState());
        return microphoneState.handle();
    }
