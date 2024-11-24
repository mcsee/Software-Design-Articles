class BrokenObject {
    private int value;

    public BrokenObject(int value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object obj) {
        return true; // Always equal
    }

    @Override
    public int hashCode() {
        return super.hashCode(); // Uses default implementation
    }
}