# Code Smell 185 - Evil Regular Expressions
            
![Code Smell 185 - Evil Regular Expressions](Code%20Smell%20185%20-%20Evil%20Regular%20Expressions.jpg)

*Regular expressions are a code smell. Sometimes also a vulnerability*

> TL;DR: Try to minimize Regular Expression's recursive rules.

# Problems 😔 

- Security Issues

- Readability

- Premature Optimization

# Solutions 😃

1. Cover the cases with tests to see if they halt

2. Use algorithms instead of regular expressions

3. Add timeout handlers

# Context 💬

This is known as [ReDos](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) attack, a subtype of a [Denial of Service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attack.

ReDoS attacks can be divided into two types:

A string with an evil pattern is passed to an application. Then this string is used as a regex, which leads to ReDoS.

A string with a vector attack format is passed to an application. Then this string is evaluated by a vulnerable regex, which leads to ReDoS.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/a4e74fb3e18cde7ff7f15636e05ced89) -->

```go
func main() {
    var regularExpression = 
        regexp.MustCompile(`^(([a-z])+.)+[A-Z]([a-z])+$`)
    var candidateString = "aaaaaaaaaaaaaaaaaaaaaaaa!"
    for index, match := 
        range regularExpression.FindAllString(candidateString, -1) {
            fmt.Println(match, "found at index", index)
    }
}
```

![Regex 101](Regex%20101.png)

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4ba06d514fb663f0ee628139d463f8c7) -->

```go
func main() {
    var candidateString = "aaaaaaaaaaaaaaaaaaaaaaaa!"

    words := strings.Fields(candidateString)

    for index, word := range words {
        if len(word) >= 2 && word[0] >= ’a’ && 
            word[0] <= ’z’ && word[len(word)-1] >= ’A’
            && word[len(word)-1] <= ’Z’ {
                fmt.Println(word, "found at index", index)
        }
    }
}
```

# Detection 🔍

[X] Semi-Automatic 

Many languages avoid this kind of regular expression.

We can also scan the code for this vulnerability.

# Tags 🏷️

- Security

# Conclusion 🏁

Regular Expressions are tricky and hard to debug. 

We should avoid them as much as possible.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 41 - Regular Expression Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md)

# More Information 📕

[Catastrophic backtracking: how can a regular expression cause a ReDoS vulnerability?](https://dev.to/unicorn_developer/catastrophic-backtracking-how-can-a-regular-expression-cause-a-redos-vulnerability-aia)

[https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)

[Runaway Regular Expressions: Catastrophic Backtracking](https://www.regular-expressions.info/catastrophic.html)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [engin akyurt](https://unsplash.com/@enginakyurt) on [Unsplash](https://unsplash.com/s/photos/regular-expression)  
  
* * *

> Some people, when confronted with a problem, think "I know, I’ll use regular expressions." Now they have two problems.

_Jamie Zawinski_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)