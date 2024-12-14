class CharacterUtils {
    static createOrpheus() {
        return { name: "Orpheus", role: "Musician" };
    }

    static createEurydice() {
        return { name: "Eurydice", role: "Wanderer" };
    }
    
    static lookBack(character) {
      if (character.name === "Orpheus") {
        return "Orpheus looks back and loses Eurydice.";
    } else if (character.name === "Eurydice") {
        return "Eurydice follows Orpheus in silence.";
    }
       return "Unknown character.";
  }
}

const orpheus = CharacterUtils.createOrpheus();
const eurydice = CharacterUtils.createEurydice();