# Code Smell 34 - Too Many Attributes

![Code Smell 34 - Too Many Attributes](andy-li-CpsTAUPoScw-unsplash.jpg)

*A class defines objects with lots of attributes.*

# Problems

- Low Cohesion

- Coupling

- Maintainability

- Readability

# Solutions

1. Find methods related to attributes.
2. Cluster these methods.
3. Break the object related to those clusters.
4. Find real objects related to this new objects and replace existing references.

# Examples

- DTOs

- Denormalized table rows

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/b6c664aef3247af3bc48d19f3d47d20e)
```dart
class ExcelSheet {
  String filename;
  String fileEncoding;
  String documentOwner;
  String documentReadPassword;
  String documentWritePassword;  
  DateTime creationTime;
  DateTime updateTime;  
  String revisionVersion;
  String revisionOwner;
  List previousVersions;  
  String documentLanguage;  
  List cells;
  List cellNames;
  List geometricShapes;  
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c34dd227f16b52772f8c4cfbb31841e8)
```dart
class ExcelSheet {
  FileProperties fileProperties;
  SecurityProperties securityProperties;
  DocumentDatingProperties datingProperties;
  RevisionProperties revisionProperties;
  LanguageProperties languageProperties;
  DocumentContent content;  
}

// Object has less attributtes
// They are not only grouped for testability
// New objects are more cohesive, more testeable, less conflicts and more reusable
// FileProperties/SecurityProperties can be reused for other documents
// Rules and preconditions on fileProperties will be moved to this object so ExcelSheet constructor will be cleaner
```

# Detection

Most linters warn when you declare too many attributes. Setting a good warning threshold should be easy.

# Tags

- Primitive

# Conclusion

Bloated objects know too much and are very difficult to change due to cohesion.

Developers change these objects a lot, so they bring merge conflicts and are a common problems source.

# Relations

[Code Smell 10 - Too Many Arguments](Code Smells\Code Smell 10 - Too Many Arguments)

[Code Smell 14 - God Objects](Code Smells\Code Smell 14 - God Objects)

# Credits

Photo by [Andy Li](https://unsplash.com/@andasta) on [Unsplash](https://unsplash.com/s/photos/container)

* * *

> So much complexity in software comes from trying to make one thing do two things.

_Ryan Singer_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()

