class ImmutableKey {
    private final int id;

    ImmutableKey(int newId) {
        this.id = newId;
    }

    @Override
    public int hashCode() {
        return this.id;
    }

    @Override
    public boolean equals(Object objectToCompare) {
        if (this == objectToCompare) return true;
        ImmutableKey that = (ImmutableKey) objectToCompare;
        return id == that.id;
    }
}

ImmutableKey key = new ImmutableKey(42);
Map<ImmutableKey, String> map = new HashMap<>();
map.put(key, "Yes Album");

System.out.println(map.get(key)); 
// Output: Yes Album
