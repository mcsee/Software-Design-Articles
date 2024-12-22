// 1. Identify static methods used in your code.			       
// 2. Replace static methods with instance methods.
// 3. Pass dependencies explicitly through
// constructors or method parameters.

class Character {
    constructor(name, role, lookBackBehavior) {
        this.name = name;
        this.role = role;
        this.lookBackBehavior = lookBackBehavior;
    }

    lookBack() {
        return this.lookBackBehavior(this);
    }
}

// 4. Refactor clients to interact with objects 
// instead of static functions.
const orpheusLookBack = (character) =>
    "Orpheus looks back and loses Eurydice.";
const eurydiceLookBack = (character) =>
    "Eurydice follows Orpheus in silence.";

const orpheus = new Character("Orpheus", "Musician", orpheusLookBack);
const eurydice = new Character("Eurydice", "Wanderer", eurydiceLookBack);