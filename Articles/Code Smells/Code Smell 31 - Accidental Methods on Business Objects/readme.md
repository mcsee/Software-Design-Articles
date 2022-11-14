# Code Smell 31 - Accidental Methods on Business Objects

![Code Smell 31 - Accidental Methods on Business Objects](Code%20Smell%2031%20-%20Accidental%20Methods%20on%20Business%20Objects.jpg)

*Adding persistence, serialization, displaying, importing, exporting code to an object bloats its protocol and brings coupling.*

# Problems

- Readability

- Coupling

- Maintainability

# Solutions

1. Keep your objects clean.

2. Decouple business objects.

3. Separate accidental concerns: Move Persistence, Formatting, Serialization to special objects.

4. Keep essential protocol using [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

# Examples

- Persistence

- Identifiers

- Serialization

- Formatting

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/11c5f7da7d9c54a05456102e128d010d)
```python
class car:

    def __init__(self,company, color, engine):
        self._company = company
        self._color = color 
        self._engine = engine
    
    def goTo(self, coordinate):        
        self.move()
        
    def startEngine(self):
        ## code to start engine
        self.engine.start()
    
    def display(self):
        print ('This is a', self._color, self.company)
        ## Displaying is accidental
        
    def toJSon(self):
        ## Serializing is accidental
        return "json"
        
    def updateOnDatabase(self):
        ## Persistence is accidental
        this.database.update(this)
        
    def getId(self):
        ## identifiers are accidental
        return id;
        
    def fromRow(self, row):
        ## Persistence is accidental
        this.database.convertFromRow(row, this);
        
    def forkCar(self):
        ## Concurrency is accidental
        ConcurrencySemaphoreSingleton.getInstance().forkCar(this)
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/47847ea77875bb6f6e5e1cba2e914b05)
```python
class car:

    def __init__(self,company,color,engine):
        self._company = company
        self._color = color 
        self._engine = engine
    
    def goTo(self, coordinate):        
        self.move()
        
    def startEngine(self):
        ## code to start engine
        self.engine.start() 
```

# Detection

It is difficult (but not impossible) to create linting rules based on naming and hinting for suspect names.

# Exceptions

- Some frameworks force us to inject dirty code in our objects. (For example identifiers).

We should try to use better languages/frameworks.

# Tags

- Declarative

# Conclusion

We are very used to see business objects polluted. This is normal. We need to reflect on the consequences and coupling from these designs.


# Credits

Photo by [Robert Bye](https://unsplash.com/@robertbye) on [Unsplash](https://unsplash.com/s/photos/mess)</span>

* * *

> Simple things should be simple, complex things should be possible.

Alan Kay

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)