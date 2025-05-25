# Code Smell 139 - Business Code in the User Interface

![Code Smell 139 - Business Code in the User Interface](Code%20Smell%20139%20-%20Business%20Code%20in%20the%20User%20Interface.jpg)

*Validations should be on the interface, or not?* 

> TL;DR: Always create correct objects in your back-ends. UIs are accidental.

# Problems 😔 

- Security problems

- Code Duplication

- Testability

- Extensibility to APIs, microservices, etc.

- Anemic and [mutable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md) objects

- [Bijection Violation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Solutions 😃

1. Move your validations to the back-end. 

# Context 💬

Code Duplication is a warning for premature optimization.

Building a system with UI validations might evolve to an API or external component consumption. 

We need to validate objects on the back-end and send good validation errors to client components.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/213101392f85e7b9b06727204c84abe1) -->

```javascript
<script type="text/javascript">

  function checkForm(form)
  {
    if(form.username.value == "") {
      alert("Error: Username cannot be blank!");
      form.username.focus();
      return false;
    }
    re = /^\w+$/;
    if(!re.test(form.username.value)) {
      alert("Error: Username must contain only letters," 
        + " numbers and underscores!");
      form.username.focus();
      return false;
    }

    if(form.pwd1.value != "" && form.pwd1.value == form.pwd2.value) {
      if(form.pwd1.value.length < 8) {
        alert("Error: Password must contain at least 8 characters!");
        form.pwd1.focus();
        return false;
      }
      if(form.pwd1.value == form.username.value) {
        alert("Error: Password must be different from Username!");
        form.pwd1.focus();
        return false;
      }
      re = /[0-9]/;
      if(!re.test(form.pwd1.value)) {
        alert("Error: password must contain 1 number (0-9)!");
        form.pwd1.focus();
        return false;
      }
      re = /[a-z]/;
      if(!re.test(form.pwd1.value)) {
        alert("Error: password must contain at least"
              + " one lowercase letter (a-z)!");
        form.pwd1.focus();
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(form.pwd1.value)) {
        alert("Error: password must contain at least"
              + " one uppercase letter (A-Z)!");
        form.pwd1.focus();
        return false;
      }
    } else {
      alert("Error: Please check that you've entered"
            +" and confirmed your password!");
      form.pwd1.focus();
      return false;
    }

    alert("You entered a valid password: " + form.pwd1.value);
    return true;
  }

</script>

<form ... onsubmit="return checkForm(this);">
<p>Username: <input type="text" name="username"></p>
<p>Password: <input type="password" name="pwd1"></p>
<p>Confirm Password: <input type="password" name="pwd2"></p>
<p><input type="submit"></p>
</form>
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/f3b239c093b15786d3e87f4a236203a2) -->

```javascript
<script type="text/javascript">

  // send a post to a backend
  // backend has domain rules
  // backend has test coverage and richmodels
  // it is more difficult to inject code in a backend
  // Validations will evolve on your backend
  // Business rules and validations are shared with every consumer
  // UI / REST / Tests / Microservices ... etc. etc.
  // No duplicated code
  function checkForm(form)
  {
    const url = "https://<hostname/login";
    const data = {
    };

    const other_params = {
        headers : {
          "content-type" : "application/json; charset=UTF-8" },
        body : data,
        method : "POST",
        mode : "cors"
    };

    fetch(url, other_params)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " +
                    response.statusText);
            }
        }).then(function(data) {
            document.getElementById("message").
              innerHTML = data.encoded;
        }).catch(function(error) {
            document.getElementById("message").
              innerHTML = error.message;
        });
    return true;
  }

</script>
```

# Detection 🔍

[X] Semi-Automatic

We can detect some behavior patterns in our UI code  

# Exceptions 🛑

If you have strong evidence on severe performance bottlenecks you need to automatically duplicate your business logic on the frontend.

You cannot just skip the backend part.

You should not make it manually because you will forget to do it.

# Tags 🏷️

- Mutability

# Conclusion 🏁

Use [TDD](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD%20Conference%202021/TDD%20Conference%202021%20-%20All%20Talks/readme.md).

You will put all your business logic behavior on your domain objects.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 90 - Implementative Callback Events](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2090%20-%20Implementative%20Callback%20Events/readme.md)

[Code Smell 78 - Callback Hell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2078%20-%20Callback%20Hell/readme.md)

[Code Smell 94 - Too Many imports](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2094%20-%20Too%20Many%20imports/readme.md)

# More Information 📕

- [The Evil power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits 🙏

Photo by [Lenin Estrada](https://unsplash.com/@lenin33) on Unsplash

* * *

> I think another good principle is separating presentation or user interface (UI) from the real essence of what your app is about. By following that principle I have gotten lucky with changes time and time again. So I think that's a good principle to follow.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)