function importBoardGameScores(fileName) {
  if (fileName) {
    const data = fs.readFileSync(fileName, 'utf-8');
    // Process board game scores...
  }
}

function importDirectoryBoardGamesScores(directoryPath) {
    const fileNames = fs.readdirSync(directoryPath);
    // Note the variable holding filenames 
    // and not files
  
   fileNames.forEach(filename => {
        const fullPath = path.join(directoryPath, filename);
        const scores = importBoardGameScores(fullPath);
        allScores.push(scores);
   });
       
   return allScores.flat();
  
  
// You can also reify the concept of a filename
// And avoid repeating the rules everywhere
  
class Filename {
    value;
    
    constructor(value) {
        this.validateFilename(value);
        this.value = value;
    }

    validateFilename(value) {      
        const invalidCharacters = /[<>:"/\\|?*\x00-\x1F]/g;
        if (invalidCharacters.test(value)) {
            throw new Error
              ('Filename contains invalid characters');
        }

        if (/^[. ]+$/.test(value)) {
            throw new Error
              ('Filename cannot consist only of dots or spaces');
        }

        if (value.length > 255) {
            throw new Error
              ('Filename is too long');
        }
    }

    toString() {
        return this.value;
    }

    get value() {
        return this.value;
    }
}

