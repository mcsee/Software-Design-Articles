# Code Smell 309 - Query Parameter API Versioning

![Code Smell 309 - Query Parameter API Versioning](Code%20Smell%20309%20-%20Query%20Parameter%20API%20Versioning.jpg)

*Misusing query parameters complicates API maintenance*

> TL;DR: Use URL paths or headers for API versioning.

# Problems 😔

- Confusing parameters
- High maintenance
- Inconsistent versioning
- Client errors
- Misused queries
- Backward incompatibility
- URL clutter
- Hidden complexity
- Wrong semantics
- Parameter collisions
- [Breaking changes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20303%20-%20Breaking%20Changes/readme.md)

# Solutions 😃

1. Adopt URL paths
2. Avoid [query parameters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)
3. Prefer headers
4. Version on [breaking changes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20303%20-%20Breaking%20Changes/readme.md)
5. Keep old versions running
6. Deprecate old versions carefully

# Context 💬

When you change an API in a way that [breaks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20303%20-%20Breaking%20Changes/readme.md) existing clients, you create problems.

To avoid this, you must version your API.

Versioning lets you add new features or change behavior without stopping old clients from working.

You usually put the version number in the API URL path, HTTP headers, or, less commonly, in query parameters.

Each method has pros and cons. URL path versioning is simple and visible. Header versioning keeps URLs clean but adds complexity.

Query parameters can clutter URLs and can be confusing. Use versioning only for breaking changes. Managing multiple versions increases maintenance work but ensures reliability and user trust.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/c8161d4579ee5b49ba8f8d171beca032) -->

```php
<?php

// Misusing query parameters for versioning
// https://eratostenes.com/api/primes?limit=10&version=2
// Version 2 is faster!

$version = $_GET['version'] ?? '1';

if ($version === '1') {
    echo json_encode(['data' => 'Response from API v1']);
} elseif ($version === '2') {
    echo json_encode(['data' => 'Response from API v2']);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unsupported API version']);
}

// This handling with IF/Switches is another code smell
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c2a918fc91b672ff19655e91c0be6745) -->

```php
<?php 
// https://eratostenes.com/api/v2/primes?limit=10
// NOTICE                     /V2/
// Version 2 is faster!

$requestUri = $_SERVER['REQUEST_URI'];

if (preg_match('#^/v([0-9]+)/#', $requestUri, $matches)) {
    $version = $matches[1];
} else {
    $version = '1';  
}

switch ($version) {
    case '1':
        echo json_encode(['data' => 'Response from API v1']);
        break;
    case '2':
        echo json_encode(['data' => 'Response from API v2']);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unsupported API version']);
}
```

<!-- [Gist Url](https://gist.github.com/mcsee/ea5a07afd606526e9c72d76f81f65840) -->

```php
<?php
// Header-based API versioning example

// GET /api/primes?limit=12 HTTP/1.1
// Host: eratostenes.com
// Accept: application/vnd.myapi.v2+json
// NOTICE THE HEADER             V2  

$acceptHeader = $_SERVER['HTTP_ACCEPT'] ?? '';

if (preg_match('#application/vnd\.myapi\.v(\d+)\+json#', 
    $acceptHeader, $matches)) {
    $version = $matches[1];
} else {
    $version = '1';  
}

switch ($version) {
    case '1':
        echo json_encode(['data' => 'Response from API v1']);
        break;
    case '2':
        echo json_encode(['data' => 'Response from API v2']);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Unsupported API version']);
}
```

# Detection 🔍

[X] Automatic

You can detect the smell when your endpoints include *?version=1*.

Linters and API design reviews can flag query parameters used for versioning.

You can detect this smell if you see clients breaking after API changes or if versioning is done inconsistently.

Look for usage of query parameters to define versions or multiple undocumented methods.

Check if old versions still respond but are not explicitly maintained or documented.

# Tags 🏷️

- Coupling

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

API versions should map [one-to-one](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) with breaking changes in your domain model.

When you create versions for non-breaking changes, you break this [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and create confusion about what constitutes a significant change.

This leads to version sprawl, where clients can't determine which version they actually need, making your API harder to consume and maintain.

When API versions correspond clearly to usage contracts, clients know what data and behavior to expect.

Breaking this one-to-one mapping by changing API behavior without versioning causes client confusion and runtime errors.

Clear versioning keeps this [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) intact and reliable.

# AI Generation 🤖

AI generators may create code with inconsistent or no API versioning, especially if asked for simple examples.

AI generators often produce quick-and-dirty endpoints with query parameters. They optimize for speed, not semantics.

# AI Detection 🧲

AI tools can detect this smell by analyzing endpoint patterns, comparing response schemas across versions, and identifying minimal differences between API versions.

They can suggest consolidating non-breaking changes into existing versions.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: use API versions in the url

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=use+API+versions+in+the+url%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=use+API+versions+in+the+url%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=use+API+versions+in+the+url%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=use+API+versions+in+the+url%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) | [You](https://you.com/search?q=use+API+versions+in+the+url%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%2F%2F+Misusing+query+parameters+for+versioning%0D%0A%2F%2F+https%3A%2F%2Feratostenes.com%2Fapi%2Fprimes%3Flimit%3D10%26version%3D2%0D%0A%2F%2F+Version+2+is+faster%21%0D%0A%0D%0A%24version+%3D+%24_GET%5B%27version%27%5D+%3F%3F+%271%27%3B%0D%0A%0D%0Aif+%28%24version+%3D%3D%3D+%271%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v1%27%5D%29%3B%0D%0A%7D+elseif+%28%24version+%3D%3D%3D+%272%27%29+%7B%0D%0A++++echo+json_encode%28%5B%27data%27+%3D%3E+%27Response+from+API+v2%27%5D%29%3B%0D%0A%7D+else+%7B%0D%0A++++http_response_code%28400%29%3B%0D%0A++++echo+json_encode%28%5B%27error%27+%3D%3E+%27Unsupported+API+version%27%5D%29%3B%0D%0A%7D%0D%0A%0D%0A%2F%2F+This+handling+with+IF%2FSwitches+is+another+code+smell%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

You need to build APIs for MCPs and AIs today.

API versioning protects your clients from breaking changes, but overuse creates maintenance nightmares and client confusion.

Version your APIs judiciously - only when you make breaking changes that would cause existing integrations to fail.

You need API versioning to keep your API reliable and backward-compatible when adding breaking changes.

Using the URL path for versions is simple and clear.

HTTP header versioning keeps URLs clean but adds complexity, while query parameter versioning should generally be avoided.

Maintain clear version documentation, test versions thoroughly, and deprecate old versions gradually.

This practice keeps your API users happy and your codebase maintainable.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 303 - Breaking Changes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20303%20-%20Breaking%20Changes/readme.md)

[Code Smell 57 - Versioned Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2057%20-%20Versioned%20Functions/readme.md)

[Code Smell 272 - API Chain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20272%20-%20API%20Chain/readme.md)

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Marcus Urbenz](https://unsplash.com/@marcusurbenz) on [Unsplash](https://unsplash.com/photos/an-aerial-view-of-a-wooden-walkway-in-the-woods-gYgDcCYob_s)

* * *

> If you program, you are an API designer. Good code is modular—each module has an API.

_Joshua Bloch_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)