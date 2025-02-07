# Code Smell 278 - DirName and File

![Code Smell 278 - DirName and File](Code%20Smell%20278%20-%20DirName%20and%20File.jpg)

*Avoid Ambiguous Naming for Path Variables*

> TL;DR: Use clear names for better code understanding.

# Problems

- Unclear variable purpose
- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault 
- Misleading context
- Repetitive code
- Harder maintenance
- Reduced readability
- [Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)
- Increased cognitive load

# Solutions

1. Honor the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) 
2. Use precise names
3. Avoid ambiguity
4. Keep context clear
5. Extract reusable code
6. Follow naming conventions
7. Reify names with their rules

# Context

When handling a single *fileName* or *directoryPath*, vague names like *file* or *dirName* create confusion. 

* A *file* should represent a File 
* A *fileName* should represent the name of a file
* *fileContents* should represent the content of a file
* A *fileHandler* should represent a pointer to an external resource
* *dirName* should be *directoryPath*

Clear names like *fileName* for names and *directoryPath* for directories communicate each variable's role. 

When you name a variable file, it can confuse others about its purpose. Does it store a file object or just the filename? 

When you name a variable *dirName* instead of directoryName it leads to ambiguity. 

Clear and descriptive variable names improve code readability and maintainability, especially in collaborative environments.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/0fb80439dd8c8e83797a3dad15a0cb22) -->

```javascript
function importBoardGameScores(file) {
  if (file) {
    const data = fs.readFileSync(file, 'utf-8');
    // Process board game scores...
  }
}

function importDirectoryScores(dirName) {
  // 'dir' is an abbreviation
  const files = fs.readdirSync(dirName);
  files.forEach(file => {
    const data = fs.readFileSync(`${dirName}/${file}`, 'utf-8');
    // Process each file's board game scores...
  });
  }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/2946663ac7d99b4925457dbbe5dfaefd) -->

```javascript
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
```

# Detection

[X] Semi-Automatic 

Look for generic names in code handling files or directory paths like *file* or *dirName*. 
  
# Tags

- Naming

# Level

[x] Beginner 

# AI Generation

AI models may default to ambiguous names like *file* or *dirName* without specific instructions. 

Adding descriptive naming and code extraction guidelines can improve the AI's output.

# AI Detection

AI tools can fix this smell by using clear naming conventions and suggesting code extraction if prompted to avoid redundant code.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=replace+file+to+filename+and+reify+the+Name+as+a+standalone+class%2C+rename+dirName+to+directoryPath%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=replace+file+to+filename+and+reify+the+Name+as+a+standalone+class%2C+rename+dirName+to+directoryPath%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=replace+file+to+filename+and+reify+the+Name+as+a+standalone+class%2C+rename+dirName+to+directoryPath%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=replace+file+to+filename+and+reify+the+Name+as+a+standalone+class%2C+rename+dirName+to+directoryPath%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=replace+file+to+filename+and+reify+the+Name+as+a+standalone+class%2C+rename+dirName+to+directoryPath%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | 
| [DeepSeek](https://chat.deepseek.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [DeepSeek](https://chat.deepseek.com/?q=replace+file+to+filename+and+reify+the+Name+as+a+standalone+class%2C+rename+dirName+to+directoryPath%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | 
| [Meta AI](https://www.meta.ai/chat?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Meta AI](https://www.meta.ai/?q=replace+file+to+filename+and+reify+the+Name+as+a+standalone+class%2C+rename+dirName+to+directoryPath%3A+%60%60%60javascript%0D%0Afunction+importBoardGameScores%28file%29+%7B%0D%0A++if+%28file%29+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28file%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+board+game+scores...%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+importDirectoryScores%28dirName%29+%7B%0D%0A++%2F%2F+%27dir%27+is+an+abbreviation%0D%0A++const+files+%3D+fs.readdirSync%28dirName%29%3B%0D%0A++files.forEach%28file+%3D%3E+%7B%0D%0A++++const+data+%3D+fs.readFileSync%28%60%24%7BdirName%7D%2F%24%7Bfile%7D%60%2C+%27utf-8%27%29%3B%0D%0A++++%2F%2F+Process+each+file%27s+board+game+scores...%0D%0A++%7D%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | 

# Conclusion

By using precise names like *fileName* and *directoryPath* and extracting reusable methods, you improve code clarity and maintainability. 

These simple practices help reduce redundancy and keep your code understandable.

# Relations

[Code Smell 33 - Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Gabriel Heinzer](https://unsplash.com/@6heinz3r) on [Unsplash](https://unsplash.com/photos/a-close-up-of-a-computer-screen-with-a-bunch-of-words-on-it-EUzk9BIEq6M)
        
* * *

> Code should be written to be read by humans first, and machines second.

_Don Laabs_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)