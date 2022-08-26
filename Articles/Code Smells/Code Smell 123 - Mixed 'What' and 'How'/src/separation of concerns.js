class Workflow {
    moveToNextTransition() {
        if (!this.canWeMoveOn()) {
            throw new Exception('Preconditions are not met yet..');
        } else {
            this.moveToNextStep();
        }
    }

    canWeMoveOn() {
        // We hide accidental implementation 'the how'
        // under the 'what'
        return !this.stepWork.hasPendingTasks();
    }
}