# Code Smell 31 - Accidental Methods on Business Objects

![Code Smell 31 - Accidental Methods on Business Objects](robert-bye-BY34glOW7wA-unsplash.jpg)

*Adding persistence, serialization, displaying, importing, exporting code to an object bloats its protocol and brings coupling.*

# Problems

- Readability

- Coupling

- Maintainability

# Solutions

1. Keep your objects clean.

2. Decouple business objects.

3. Separate accidental concerns: Move Persistence, Formatting, Serialization to special objects.

4. Keep essential protocol using [bijection](Theory\The One and Only Software Design Principle).

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

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()