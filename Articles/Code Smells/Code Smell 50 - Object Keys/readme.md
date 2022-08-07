# Code Smell 50 - Object Keys

![Code Smell 50 - Object Keys](maurice-williams-tPX992SVljo-unsplash.jpg)

*Primary keys, IDs, references. The first attribute we add to our objects. They don't exist in the real world.*

# Problems

- Coupling

- Accidental Implementation

- [Bijection Principle](../../Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Violation.

# Solutions

1. Reference *object* to *objects*.

2. Build a [MAPPER](../../Theory/What%20is%20(wrong%20with)%20software/readme.md).

3. Only use keys if you need to provide an external (accidental) reference. Databases, APIs, Serializations.

4. Use dark keys or [GUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) when possible.

5. If you are afraid of getting a big relation graph use proxies or lazy loading.

6. Don't use DTOs.

[Code Smell 40 - DTOs](../../Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/388923d775ca893eb1e6ca4c28c3287f)
```javascript
class Teacher {
    static getByID(id) {
        // go to the coupled database
    }

    constructor(id, fullName) {
        this.id = id;
        this.fullName = fullName;
    }
}

class School {
    static getByID(id) {
        // go to the coupled database
    }

    constructor(id, address) {
        this.id = id;
        this.address = address;
    }
}

class Student {
    constructor(firstName, lastName, id, teacherId, schoolId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.teacherId = teacherId;
        this.schoolId = schoolId;
    }

    school() {
        return School.getById(this.schoolId);
    }

    teacher() {
        return Teacher.getById(this.teacherId);
    }
}


 
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9a0f4f02514f740f3872cbc463d25c8b)
```javascript
class Teacher {
    constructor(fullName) {
        this.fullName = fullName;
    }
}

class School {
    constructor(address) {
        this.address = address;
    }
}

class Student {
    constructor(firstName, lastName, teacher, school) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.teacher = teacher;
        this.school = school;
    }
}

// If we need to expose a School to an external API or a Database. Another object (not school) will keep the mapping externalId<->school and so on

```

# Detection

This is a design policy. 

We can enforce business objects to warn us if we define an attribute or function including the sequence *id*.

# Tags

- Accidental

# Conclusion

Ids are not necessary for OOP. You reference objects (essential) and never ids (accidental).

In case you need to provide a reference out of your system's scope (APIs, interfaces, Serializations) use dark and meaningless IDs (GUIDs).

# Relations

[Code Smell 20 - Premature Optimization](../../Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# More info

[What is (wrong with) software?](../../Theory/What%20is%20(wrong%20with)%20software/readme.md)

[The One and Only Software Design Principle](../../Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

[Coupling - The one and only software design problem](../../Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Credits

Photo by [Maurice Williams](https://unsplash.com/@mauricew98) on [Unsplash](https://unsplash.com/s/photos/keychain)

* * *

> All problems in computer science can be solved by another level of indirection.

_David Wheeler_
 
* * *
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)

