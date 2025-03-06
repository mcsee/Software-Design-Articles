# Refactoring 001 - Remove Setters

![Refactoring 001 - Remove Setters](Refactoring%20001%20-%20Remove%20Setters.jpg)

*Setters violate immutability and add accidental coupling*

> TL;DR: Make your attributes private to favor mutability 

# Problems Addressed

- Mutability

- setXXX() violates good naming policies since it does not exist on the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

- Accidental [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Related Code Smells

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

# Steps

1. Locate the setters' usage

2. If you are setting essential properties, move them to the constructor and remove the method

3. If you need to change an accidental property, then it is not a setter. Remove the setXXX prefix

# Sample Code

## Before
 
<!-- [Gist Url](https://gist.github.com/mcsee/b34136c13dddf4cd751579c2b51d91a3) -->

```java
public class Point {
   protected int x;
   protected int y;
  
   public Point() {
        this.x = 0;
        this.y = 0;        
   }
    
   public void setX(int x) {
	this.x = x;
   }
  
   public void setY(int y) {
        this.y = y;
  } 
}

Point location = new Point();
// At this moment, it is not clear which points represent
// It is coupled to the constructor decision.
// Might be null or some other convention

location.setX(1);
// Now we have point(1,0)

location.setY(2);
// Now we have point(1,2)
```

<!-- [Gist Url](https://gist.github.com/mcsee/d8a4183ef00f5636c2d821f96a9cefd0) -->

```java
public class Car {
   protected int speed;
  
   public Car() {     
   }
    
   public void setSpeed(Speed desiredSpeed) {
	this.speed = desiredSpeed;
   }   
}

Car tesla = new Car();
// We have no speed??

tesla.setSpeed(100 km/h);
// Now our car runs fast
```

## After

<!-- [Gist Url](https://gist.github.com/mcsee/9998a9ed50514d162333c7d05ca34415) -->

```java
// 1. We locate setters usage
location.setX(1);

location.setY(2);

// 2. If you are setting essential properties move
// them to the constructor and remove the method
public class Point {
   public Point(int x, int y) {
        this.x = x;
        this.y = y;        
     // We remove the setters
   }

Point location = new Point(1, 2);
```

<!-- [Gist Url](https://gist.github.com/mcsee/28a11e50d2880767238e6198ccaa93f5) -->

```java
public class Car {
   protected int speed;
  
   public Car() {    
     this.speed = 0 km/h;
   }
    
   public void speed(Speed desiredSpeed) {
	    this.speed = desiredSpeed;
   }   
}

// 1. Locate the setters usage
// 3. If you need to change an accidental property
// it is not a setter. Remove the setXXX prefix

Car tesla = new Car();
// Our car is stopped

tesla.speed(100 km/h);
// We tell the desired speed. We don't set anything
// We don't care if the car stores its new speed.
// if it manages through the engine
// if the road is moving etc
```
	     
# Type

[X] Semi-Automatic

You should detect setters (unless they use meta-programming) with your IDEs.

You can also remove them and see which tests fail if you have good coverage.

# Safety

This is not a safe refactoring since you might miss some methods calling the removed setters.

You need to make sure to have good coverage and also an excellent QA process to ensure a smooth refactoring.
															     
# Why is the Code Better?

This refactoring improves encapsulation and integrity adding an extra access control layer.

# Refactor with AI

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Locate+the+setters%27+usage2.+If+you+are+setting+essential+properties%2C+move+them+to+the+constructor+and+remove+the+method3.+If+you+need+to+change+an+accidental+property%2C+then+it+is+not+a+setter.+Remove+the+setXXX+prefix%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Locate+the+setters%27+usage2.+If+you+are+setting+essential+properties%2C+move+them+to+the+constructor+and+remove+the+method3.+If+you+need+to+change+an+accidental+property%2C+then+it+is+not+a+setter.+Remove+the+setXXX+prefix%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Locate+the+setters%27+usage2.+If+you+are+setting+essential+properties%2C+move+them+to+the+constructor+and+remove+the+method3.+If+you+need+to+change+an+accidental+property%2C+then+it+is+not+a+setter.+Remove+the+setXXX+prefix%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Locate+the+setters%27+usage2.+If+you+are+setting+essential+properties%2C+move+them+to+the+constructor+and+remove+the+method3.+If+you+need+to+change+an+accidental+property%2C+then+it+is+not+a+setter.+Remove+the+setXXX+prefix%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=1.+Locate+the+setters%27+usage2.+If+you+are+setting+essential+properties%2C+move+them+to+the+constructor+and+remove+the+method3.+If+you+need+to+change+an+accidental+property%2C+then+it+is+not+a+setter.+Remove+the+setXXX+prefix%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | 
| [DeepSeek](https://chat.deepseek.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | [DeepSeek](https://chat.deepseek.com/?q=1.+Locate+the+setters%27+usage2.+If+you+are+setting+essential+properties%2C+move+them+to+the+constructor+and+remove+the+method3.+If+you+need+to+change+an+accidental+property%2C+then+it+is+not+a+setter.+Remove+the+setXXX+prefix%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | 
| [Meta AI](https://www.meta.ai/chat?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | [Meta AI](https://www.meta.ai/?q=1.+Locate+the+setters%27+usage2.+If+you+are+setting+essential+properties%2C+move+them+to+the+constructor+and+remove+the+method3.+If+you+need+to+change+an+accidental+property%2C+then+it+is+not+a+setter.+Remove+the+setXXX+prefix%3A+%60%60%60java%0D%0Apublic+class+Point+%7B%0D%0A+++protected+int+x%3B%0D%0A+++protected+int+y%3B%0D%0A++%0D%0A+++public+Point%28%29+%7B%0D%0A++++++++this.x+%3D+0%3B%0D%0A++++++++this.y+%3D+0%3B++++++++%0D%0A+++%7D%0D%0A++++%0D%0A+++public+void+setX%28int+x%29+%7B%0D%0A%09this.x+%3D+x%3B%0D%0A+++%7D%0D%0A++%0D%0A+++public+void+setY%28int+y%29+%7B%0D%0A++++++++this.y+%3D+y%3B%0D%0A++%7D+%0D%0A%7D%0D%0A%0D%0APoint+location+%3D+new+Point%28%29%3B%0D%0A%2F%2F+At+this+moment%2C+it+is+not+clear+which+points+represent%0D%0A%2F%2F+It+is+coupled+to+the+constructor+decision.%0D%0A%2F%2F+Might+be+null+or+some+other+convention%0D%0A%0D%0Alocation.setX%281%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C0%29%0D%0A%0D%0Alocation.setY%282%29%3B%0D%0A%2F%2F+Now+we+have+point%281%2C2%29%0D%0A%60%60%60) | 

# Tags

- Mutability

# Related Refactorings

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

- Remove Getters

# Credits

Image by [Comfreak](https://pixabay.com/users/comfreak-51581/) on [Pixabay](https://pixabay.com/)

* * *

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)