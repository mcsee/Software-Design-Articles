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