class MutableKey {
    int id;

    MutableKey(int newId) {
        this.id = newId;
    }

    @Override
    public int hashCode() {
        return this.id;
    }

    @Override
    public boolean equals(Object objectToCompare) {
        if (this == objectToCompare) return true;
        MutableKey that = (MutableKey) objectToCompare;
        return id == that.id;
    }
}

MutableKey key = new MutableKey(42);
Map<MutableKey, String> map = new HashMap<>();
map.put(key, "Yes Album");

// The key mutates
key.id = 90125;

// Now you cannont retrieve the album
System.out.println(map.get(key)); 

// Output: null