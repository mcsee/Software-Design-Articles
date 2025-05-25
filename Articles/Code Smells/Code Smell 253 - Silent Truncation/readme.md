# Code Smell 253 - Silent Truncation
            
![Code Smell 253 - Silent Truncation](Code%20Smell%20253%20-%20Silent%20Truncation.jpg)

*You silently truncate your user data without warning*

> TL;DR: If you limit text lengths, enforce them everywhere!

# Problems 😔 

- The Fail Fast Principle Violation

- Corrupted and Missing Data

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- UTF-8 Truncation

- The Least Surprise principle violation

- Separation of Concerns of the UI and the Model

# Solutions 😃

1. Be consistent with length rules

2. Enforce the rules in the domain objects

# Context 💬

Imagine the scenario where you need to persist your objects in a database restricting the size of your texts.

Most databases will silently truncate your data and you will not notice the problem until you retrieve them.

If you need to enforce an arbitrary limit, add these business rules in your objects following the bijection rule.

Adding this control only in the UI or external API is another code smell about misplaced responsibilities.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/7b1f2afc8132fc6a518c3a5d5fb70f3c) -->

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// The page architecture is over simplified
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save-data', (req, res) => {
  const fullText = req.body.fullText;
  const truncatedText = fullText.slice(0, 255);
  // This truncation is not explicit sometimes  

  db.query('INSERT INTO table_name (truncated_text) VALUES (?)', 
           [truncatedText], (err, result) => {
    if (err) throw err;
    res.send('Data saved successfully');
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));

<!DOCTYPE html>
<html>
<head>
  <title>Penrose Theory on Quantum Consciousness</title>
  <script>
    const form = document.getElementById('textForm');
    const textArea = document.getElementById('textArea');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const fullText = textArea.value;

      if (fullText.length > 1000) {
        alert('Text cannot exceed 1000 characters');
        return;
      }

      fetch('/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `fullText=${encodeURIComponent(fullText)}`
      })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
  </script>
</head>
<body>
  <h1>Penrose Theory on Quantum Consciousness</h1>
  <form id="textForm">
    <textarea id="textArea" 
      rows="10" 
      placeholder="Enter text on Penrose's theory (max 1000 chars)">
    </textarea>
    <button type="submit">Save</button>
  </form>
</body>
</html>
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/3861712d705be4717836079118457b80) -->

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./db');

// You should defined this constant in the backend
// Hopefully in a domain object
const MAX_CHARS = 255;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/max-chars', (req, res) => {
  res.json({ maxChars: MAX_CHARS });
});

app.post('/save-data', (req, res) => {
  const fullText = req.body.fullText;
  const truncatedText = fullText.slice(0, MAX_CHARS);

  db.query('INSERT INTO table_name (truncated_text) VALUES (?)',
           [truncatedText], (err, result) => {
    if (err) throw err;
    res.send('Data saved successfully');
  });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));

<!DOCTYPE html>
<html>
<head>
  <title>Penrose Theory on Quantum Consciousness</title>
  <script>
    let maxChars;

    fetch('/max-chars')
      .then(response => response.json())
      .then(data => {
        maxChars = data.maxChars;
        const form = document.getElementById('textForm');
        const textArea = document.getElementById('textArea');

        form.addEventListener('submit', (event) => {
          event.preventDefault();
          const fullText = textArea.value;

          if (fullText.length > maxChars) {
            alert(`Text cannot exceed ${maxChars} characters`);
            return;
          }

          fetch('/save-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `fullText=${encodeURIComponent(fullText)}`
          })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        });
      })
      .catch(error => console.error('Error:', error));
  </script>
</head>
<body>
  <h1>Penrose Theory on Quantum Consciousness</h1>
  <form id="textForm">
    <textarea id="textArea" 
      rows="10"
      placeholder="Enter text about Penrose's theory">
    </textarea>
    <button type="submit">Save</button>
  </form>
</body>
</html>
```

# Detection 🔍

[X] Semi-Automatic 

You can do boundary testing. For example, using [Zombies](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20I%20Survived%20the%20Zombie%20Apocalypse/readme.md) methodology

# Tags 🏷️

- Fail Fast

# Level 🔋

[X] Intermediate

# AI Generation 🤖

Ai generator usually duplicate these controls instead of placing in a single place

# AI Detection 🥃

It was hard to tell AI to use this as a backend constant prompting with an accurate instruction

# Conclusion 🏁

You need to handle a clear separation of concerns between the client-side (UI) and server-side (database operations).

The client-side handles user input validation and displaying data, while the server-side handles data storage and retrieval from the database.

You defined the maximum character limit in the backend and fetched by the client-side making it easier to update or change the limit across the application without modifying the client-side code and having ripple effect.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 139 - Business Code in the User Interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20139%20-%20Business%20Code%20in%20the%20User%20Interface/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Jametlene Reskp](https://unsplash.com/@reskp) on [Unsplash](https://unsplash.com/photos/person-chopping-dough-sb6UGjIYIpo)
    
* * *

> In programming, if someone tells you you're overcomplicating it, they're either 10 steps behind you or 10 steps ahead of you.

_Andrew Clark_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)