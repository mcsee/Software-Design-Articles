class Workflow {
    moveToNextTransition() {
        // We couple the business rule with the accidental implementation
        if (this.stepWork.hasPendingTasks) {
            throw new Exception('Preconditions are not met yet..');
        } else {
            this.moveToNextStep();
        }
    }
}