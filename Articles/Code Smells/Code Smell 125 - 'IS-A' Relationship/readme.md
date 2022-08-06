# Code Smell 125 - 'IS-A' Relationship

![Code Smell 125 - 'IS-A' Relationship](joshua-rondeau-jQkhAxtq70E-unsplash.jpg)

*We learned at school that inheritance represents an 'is-a' relationship. It is not.*

> TL;DR: Think about protocol and behavior, forget inheritance 

# Problems

- Bad models

- Unexpected behavior

- Subclass overrides

- Liskov substitution principle Violation

# Solutions

1. Think in terms of behavior *behaves-as-a*

2. Prefer composition over inheritance

3. Subclassify always following 'behaves-as-a' relation

# Context

[IS-A relation](https://en.wikipedia.org/wiki/Is-a) comes from the data world.

We learned [ERDs](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) with structured design and data modeling.

Now, we need to think in terms of behavior.

Behavior is essential, data is [accidental](Theory\No Silver Bullet).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/34677fbac1f6a837bf2b8d17bc882251)
```cpp
// If you made Square derive from Rectangle, 
// then a Square should be usable anywhere you expect a rectangle

#include <iostream>

Rectangle::Rectangle(const unsigned width, const unsigned height):
    m_width(width),
    m_height(height)
{
}

unsigned Rectangle::getWidth() const
{
    return m_width;
}

void Rectangle::setWidth(const unsigned width)
{
  /* Width and Height are independent */
    m_width = width;
}

unsigned Rectangle::getHeight() const
{
    return m_height;
}

void Rectangle::setHeight(const unsigned height)
{
    m_height = height;
}

unsigned Rectangle::area() const
{
  /*Valid for both Rectangles and Squares*/
    return m_height * m_width;
}

Square::Square(const unsigned size)
    : Rectangle(size, size)
{
}

// OK for squares, bad for rectangles
// Protocol is bad, width and height are not relevant on squares
void Square::setWidth(const unsigned size)
{
    m_height = size;
    m_width = size;
}

// OK for squares, bad for rectangles
// Protocol is bad, width and height are not relevant on squares
void Square::setHeight(const unsigned size)
{
    m_height = size;
    m_width = size;
}

void process(Rectangle& r)
{
    unsigned h = 10;
    auto w = r.getWidth();
    r.setHeight(h);

    std::cout << "Expected area: " << (w*h) << ", got " << r.area() << "\n";
    // area is not well defined in squares
    // every square IS-A rectangle, but does not behave-like a rectangle
}

int main()
{
    Rectangle rectangle{3,4};
    Square square{5};
    process(rectangle);
    process(square);
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/29e46d1d672ac397552fae978148a7c2)
```cpp
// If you made Square derive from Rectangle, 
// then a Square should be usable anywhere you expect a rectangle

#include <iostream>

Rectangle::Rectangle(const unsigned width, const unsigned height):
    m_width(width),
    m_height(height)
{
}

void Rectangle:changeWidth(const unsigned width)
{
  /* Width and Height are independant */
    m_width = width;
    // We should discuss if it is good to mutate 
    // and not create a new Figure
}

void Rectangle::changeHeight(const unsigned height)
{
    m_height = height;
}

unsigned Rectangle::area() const
{ 
    return m_height * m_width;
}

// No inheritance
Square::Square(const unsigned size):
    m_size(size)
{
}

unsigned Square::area() const
{ 
    return m_size * m_size;
}
 
void Square::changeSize(const unsigned size)
{
    m_size = size; 
}
 
void testRectangleChange(Rectangle& r)
{
    unsigned h = 10;
    auto w = r.getWidth();
    r.setHeight(h);

    std::cout << "Expected area: " << (w*h) << ", got " << r.area() << "\n";
    // area is not well defined in squares
    // every square IS-A rectangle, but does not behave-like a rectangle
}

int main()
{
    Rectangle rectangle{3,4};
    Square square{5};
    testRectangleChange(rectangle);
    testRectangleChange(square);
}
```

# Detection 

[X] Manual

This is a semantic smell.

# Tags

- Inheritance

# Conclusion

*Real* Number IS-A *Complex* number (according to math).

*Integer* IS-A *Real* number (according to math).

*Real* Number does not Behave-Like-A *Complex* number.

We cannot do real.setImaginaryPart() so it is not a Complex according to our [Bijection](Theory\What is (wrong with) software)

# Relations

[Code Smell 92 - Isolated Subclasses Names](Code Smells\Code Smell 92 - Isolated Subclasses Names)

[Code Smell 11 - Subclassification for Code Reuse](Code Smells\Code Smell  11 - Subclassification for Code Reuse)

[Code Smell 37 - Protected Attributes](Code Smells\Code Smell 37 - Protected Attributes)

# More Info

- [Circle/Ellipse Problem](https://en.wikipedia.org/wiki/Circle%E2%80%93ellipse_problem)

- [Subtyping](https://en.wikipedia.org/wiki/Subtyping)

- [No Silver Bullet](Theory\No Silver Bullet)

- [Bijection Principle](Theory\What is (wrong with) software)

# Credits

Photo by [Joshua Rondeau](https://unsplash.com/@liferondeau) on [Unsplash](https://unsplash.com/s/photos/costume)  

* * *

> DRY - Don't Repeat Yourself - Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

_Andy Hunt_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()