# Code Smell 303 - Breaking Changes

![Code Smell 303 - Breaking Changes](Code%20Smell%20303%20-%20Breaking%20Changes.jpg)

*When you break APIs without warning, you break trust*

> TL;DR: You should version your APIs to prevent breaking existing clients when you make changes.

# Problems 😔

- Client applications crashes
- Integration failures
- Least Minimal Surprise Principle violation
- Downtime
- Broken Trust
- Deployment rollbacks needed
- Development time wasted
- User experience degradation

# Solutions 😃

1. Add semantic versioning
2. Implement backward compatibility
3. Create deprecation warnings
4. Create roadmaps
5. Use content negotiation
6. Maintain parallel versions
7. Communicate changes early
8. Deprecate features gradually
9. Document breaking changes clearly
10. Check deprecated parameters with logging
11. Test new versions thoroughly
12. Remove deprecated functionality after sunset

# Context 💬

When you modify APIs without proper versioning, you create breaking changes that affect all existing clients.

You force consumers to update their code immediately or face system failures.

You break the implicit contract between API providers and consumers.

Modern software relies heavily on API stability, and introducing breaking changes without warning can create cascading failures across dependent systems.

This is more important today than ever since [many IAs build their solutions using existing API documentation](https://refactoring.fm/p/how-to-design-apis-for-an-ai-world).

When you update an API without maintaining backward compatibility, you risk breaking all the applications that depend on it.

This creates instability, frustration, and costly fixes for users.

Clients often tolerate [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) in new functionalities, but never a previously stable behavior broken.

Proper versioning ensures smooth transitions and maintains your system's reliability.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/d11fbd7a25ac1e15035c01166d1fbadd) -->

```javascript
// user-api-v1.json - Original API response
{
  "id": 317,
  "name": "Mr Nimbus",
  "email": "nimbus@atlantis.com",
  "nationalities": "Brazilian,Canadian,Oceanic"
}

// Later changed to this without versioning:
{
  "userId": 317,
  "fullName": "Mr Nimbus", 
  "emailAddress": "nimbus@atlantis.com",
  "createdAt": "2018-12-09T18:30:00Z",
  "nationalities": ["Brazilian", "Canadian", "Oceanic"]
}

fetch('/api/users/317')
  .then(response => response.json())
  .then(user => {
    // This breaks when API changes field names and data types
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    // This breaks when nationalities changes from string to array
    document.getElementById('nationalities').textContent 
      = user.nationalities;
  });
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/ac3ed6c1ef4cb889369765418ee4b3e4) -->

```javascript
// user-api-v1.json - Version 1 (maintained)
{
  "id": 317,
  "name": "Mr Nimbus",
  "email": "nimbus@atlantis.com",
  "nationalities": "Brazilian,Canadian,Oceanic"
}

// user-api-v2.json - Version 2 
// (new structure, backward compatible)
{
  "id": 317,
  "userId": 317,
  "name": "Mr Nimbus",
  "fullName": "Mr Nimbus",
  "email": "nimbus@atlantis.com",
  "emailAddress": "nimbus@atlantis.com",
  "createdAt": "2018-12-09T18:30:00Z",
  "nationalities": "Brazilian,Canadian,Oceanic"
  "nationalitiesList": ["Brazilian", "Canadian", "Oceanic"]
}

// user-api-v3.json - Version 3 
// (new structure, backward not compatible)
{
  "userId": 317,
  "fullName": "Mr Nimbus",
  "emailAddress": "nimbus@atlantis.com",
  "createdAt": "2018-12-09T18:30:00Z",
  "nationalitiesList": ["Brazilian", "Canadian", "Oceanic"]
}

// client-code-versioned.js
const API_VERSION = 'v1';

fetch(`/api/${API_VERSION}/users/317`)
  .then(response => response.json())
  .then(user => {
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    // V1 handles comma-separated string
    document.getElementById('nationalities').textContent
      = user.nationalities;
  });

// Or with content negotiation
fetch('/api/users/317', {
  headers: {
    'Accept': 'application/vnd.api+json;version=1'
  }
})
  .then(response => response.json())
  .then(user => {
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    document.getElementById('nationalities').textContent 
      = user.nationalities;
  });
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell when you find APIs that change field names, remove fields, or alter data structures without maintaining backward compatibility.

Look for client applications that break after API deployments.

Check for missing version headers or URL versioning schemes.

Monitor error logs for sudden spikes in client failures after releases.

# Tags 🏷️

- APIs

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

You must maintain a stable [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) between your API contract and client expectations.

When you break this [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by changing the API without versioning, you violate the fundamental principle that clients can rely on consistent interfaces.

You create a mismatch between what clients expect to receive and what your API provides.

This breaks the one-to-one correspondence between API promises and API delivery, leading to system failures and lost trust.

APIs model real-world services. When you break the mapping between your API and the business logic it represents, clients can't reliably interact with your system.

This mismatch leads to defects, downtime, a lack of trust, and a poor user experience.

# AI Generation 🤖

AI generators often create this smell when you ask them to "improve" or "update" existing APIs.

They focus on making the API "better" without considering backward compatibility.

You need to explicitly instruct AI tools to maintain existing field names and add versioning when making changes.

They often favor clean design over stability unless *explicitly* told otherwise.

# AI Detection 🧲

AI generators can fix this smell when you provide clear instructions about API versioning strategies.

You should ask them to implement semantic versioning, maintain backward compatibility, and create migration paths for deprecated features.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Create API versioning to prevent breaking changes

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Create+API+versioning+to+prevent+breaking+changes%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Create+API+versioning+to+prevent+breaking+changes%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Create+API+versioning+to+prevent+breaking+changes%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Create+API+versioning+to+prevent+breaking+changes%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) | [You](https://you.com/search?q=Create+API+versioning+to+prevent+breaking+changes%3A+%60%60%60javascript%0D%0A%2F%2F+user-api-v1.json+-+Original+API+response%0D%0A%7B%0D%0A++%22id%22%3A+317%2C%0D%0A++%22name%22%3A+%22Mr+Nimbus%22%2C%0D%0A++%22email%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22nationalities%22%3A+%22Brazilian%2CCanadian%2COceanic%22%0D%0A%7D%0D%0A%0D%0A%2F%2F+Later+changed+to+this+without+versioning%3A%0D%0A%7B%0D%0A++%22userId%22%3A+317%2C%0D%0A++%22fullName%22%3A+%22Mr+Nimbus%22%2C+%0D%0A++%22emailAddress%22%3A+%22nimbus%40atlantis.com%22%2C%0D%0A++%22createdAt%22%3A+%222018-12-09T18%3A30%3A00Z%22%2C%0D%0A++%22nationalities%22%3A+%5B%22Brazilian%22%2C+%22Canadian%22%2C+%22Oceanic%22%5D%0D%0A%7D%0D%0A%0D%0Afetch%28%27%2Fapi%2Fusers%2F317%27%29%0D%0A++.then%28response+%3D%3E+response.json%28%29%29%0D%0A++.then%28user+%3D%3E+%7B%0D%0A++++%2F%2F+This+breaks+when+API+changes+field+names+and+data+types%0D%0A++++document.getElementById%28%27name%27%29.textContent+%3D+user.name%3B%0D%0A++++document.getElementById%28%27email%27%29.textContent+%3D+user.email%3B%0D%0A++++%2F%2F+This+breaks+when+nationalities+changes+from+string+to+array%0D%0A++++document.getElementById%28%27nationalities%27%29.textContent+%0D%0A++++++%3D+user.nationalities%3B%0D%0A++%7D%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

You should always version your APIs to prevent breaking changes from impacting client applications.

Even from your first version.

When you maintain stable contracts through proper versioning, you build trust with API consumers and enable smooth evolution of your systems.

Breaking changes are inevitable, but they shouldn't break your clients.

Always version your APIs, deprecate carefully, and communicate proactively to avoid unnecessary disruptions.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 302 - Misleading Status Codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20302%20-%20Misleading%20Status%20Codes/readme.md)

[Code Smell 16 - Ripple Effect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2016%20-%20Ripple%20Effect/readme.md)

[Code Smell 57 - Versioned Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2057%20-%20Versioned%20Functions/readme.md)

[Code Smell 106 - Production Dependent Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20106%20-%20Production%20Dependent%20Code/readme.md)

[Code Smell 170 - Refactor with Functional Changes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20170%20-%20Refactor%20with%20Functional%20Changes/readme.md)

[Code Smell 175 - Changes Without Coverage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20175%20-%20Changes%20Without%20Coverage/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Giancarlo Revolledo](https://unsplash.com/@giancarlor_photo) on [Unsplash](https://unsplash.com/photos/metal-bridge-near-boat-during-daytime-QOkr2RY4DT4)

* * *

> APIs are forever, so design them carefully

_Martin Fowler_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)