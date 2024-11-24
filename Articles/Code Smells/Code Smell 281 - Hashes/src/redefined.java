class FixedObject {
    private final int value;

    public FixedObject(int value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        FixedObject that = (FixedObject) obj;
        return value == that.value;
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}

// This is the best solution

class CleanObject {
    private final int value;

    public FixedObject(int value) {
        this.value = value;
    }

    // - @Override
    // - public boolean equals(Object obj) {}

    // - @Override
    // - public int hashCode() { 
    }
}