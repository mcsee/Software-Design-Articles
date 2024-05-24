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
      placeholder="Enter text about Penrose's theory (max 1000 characters)">
    </textarea>
    <button type="submit">Save</button>
  </form>
</body>
</html>