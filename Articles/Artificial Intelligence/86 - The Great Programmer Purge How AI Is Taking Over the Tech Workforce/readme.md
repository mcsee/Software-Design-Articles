# The Great Programmer Purge: How AI Is Taking Over the Tech Workforce

![The Great Programmer Purge: How AI Is Taking Over the Tech Workforce](robots.jpeg)

*How AI is Redefining the Role of Programmers in the Tech Industry*

> TL;DR: AI-generated code outperforms lazy programmers. Software jobs are declining, but centaurs will survive.

Today, a friend of mine shared his frustration about being asked to fill out a registration form requiring a username and password.

The system was poorly designed and demanded a secure password without explaining what the issue was.

![Message Box](Message%20Box.png)

This is a clear example of terrible UX and a lazy programmer unaware of writing error messages with empathy.

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

I told my friend this is unacceptable in today's world since modern AIs can easily solve such problems.

I took my phone and said, "L.M.P.T.F.Y." (Let Me Prompt That For You), the modern equivalent to [LMGTFY](https://en.wiktionary.org/wiki/LMGTFY).

I quickly wrote a prompt:

> Give me the code for a secure password validation site with helpful error messages when the user enters a weak password.

The A.I. successfully provided a working page with this code:

<!-- [Gist Url](https://gist.github.com/mcsee/a7121f5432acbacff39d4aad8efab92a) -->

```javascript
document.getElementById('passwordForm')
  .addEventListener('submit', function(event) {
  event.preventDefault(); 
  // Prevent the form from submitting
  const password = document.getElementById('password').value; 
  // Get the password value
  const errorMessages = document.getElementById('errorMessages'); 
  // Get the error messages container
  errorMessages.innerHTML = ''; // Clear previous error messages

  let errors = []; // Array to store error messages

  // Validate minimum length
  if (password.length < 8) {
    errors.push('The password must be at least 8 characters long.');
  }

  // Validate uppercase letters
    if (!/[A-Z]/.test(password)) {
      errors.push('The password must contain one uppercase letter.');
    }

    // Validate lowercase letters
    if (!/[a-z]/.test(password)) {
      errors.push('The password must contain one lowercase letter.');
    }

    // Validate numbers
    if (!/[0-9]/.test(password)) {
      errors.push('The password must contain one number.');
    }

    // Validate special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('The password must contain one special character.');
    }

    // Display errors or success message
    if (errors.length > 0) {
      errors.forEach(error => {
          const p = document.createElement('p'); 
          // Create a new paragraph element
          p.textContent = error; 
          // Set the error message as text
          errorMessages.appendChild(p);
          // Add the error message to the container
      });
    } else {
        alert('Valid password!'); 
        // Show success message if no errors
    }
});
```

You can also try it yourself:

- [ChatGPT](https://chat.openai.com/?q=Give%20me%20the%20code%20for%20a%20secure%20password%20validation%20site%20with%20helpful%20error%20messages%20when%20the%20user%20enters%20a%20weak%20password.)

- [Claude](https://claude.ai/new?q=Give%20me%20the%20code%20for%20a%20secure%20password%20validation%20site%20with%20helpful%20error%20messages%20when%20the%20user%20enters%20a%20weak%20password.) (Includes a working preview)

- [Perplexity](https://www.perplexity.ai/search/new?q=Give%20me%20the%20code%20for%20a%20secure%20password%20validation%20site%20with%20helpful%20error%20messages%20when%20the%20user%20enters%20a%20weak%20password.)

- [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Give%20me%20the%20code%20for%20a%20secure%20password%20validation%20site%20with%20helpful%20error%20messages%20when%20the%20user%20enters%20a%20weak%20password.)

- [Gemini](https://gemini.google.com/)

- [DeepSeek](https://chat.deepseek.com/)

- [Meta AI](https://www.meta.ai/)

- [Qwen](https://chat.qwen.ai/)

# The Bad News

The AI-generated solution with helpful error messages is bad news for lazy programmers.

Software development jobs are already declining, and this trend is expected to continue:

[Pragmatic Engineer Article about Job Openings](https://newsletter.pragmaticengineer.com/p/software-engineering-job-openings) 

This is something many people have been forecasting.

I wrote an article five years ago during the last [AI Winter](https://en.wikipedia.org/wiki/AI_winter) predicting this would happen.

[Most Programmers Are Losing Their Jobs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Opinion/(Most)%20Programmers%20are%20losing%20our%20jobs%20very%20soon/readme.md)

As the great Niels Bohr once [said](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md):

> Prediction is very difficult, especially about the future.

![Trump](The%20Great%20Programmer%20Purge%20How%20AI%20Is%20Taking%20Over%20the%20Tech%20Workforce.jpg)

Now, it's clear: lazy programmers are doomed!

# The Good News

What can we do as software engineers besides writing mediocre code?

## Give Up

![Chores](Chores.jpg)

## Explore Other Careers

Soon, there will be a shortage of handy people such as electricians, plumbers, and painters.

[![Watch the video](https://img.youtube.com/vi/uU-XfZgQIVw/sddefault.jpg)](https://youtu.be/uU-XfZgQIVw) 

## Improve Ourselves by Becoming Centaurs.

A.I. won't take your job. A developer mastering AI tools will.

I write biweekly articles about [clean code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md), [refactoring](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md), and programming.

In these articles, you can compare the output of many AIs with and without guidance.

For example, the above code has several problems unnoticed by AIs:

[Code Smell 151 - Commented Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md)

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

Humans remain invaluable when they know how to harness AI effectively.

Here's a video benchmarking some tools:

[![Watch the video](https://img.youtube.com/vi/99GuXTIW0R4/sddefault.jpg)](https://youtu.be/99GuXTIW0R4) 

# Conclusion

This article isn’t just a warning for junior programmers — senior developers should also [learn to master these tools](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/ChatGPT%20The%20Surprising%20Teacher%20of%20a%20+25%20Year%20Senior%20Programmer/readme.md).

Hopefully, my friend will soon complete the password form — or better yet developers will deprecate all passwords.

Also, I hope you'll write solutions like these and get paid as a "Centaur"- a developer who masters AI tools to enhance their craft.