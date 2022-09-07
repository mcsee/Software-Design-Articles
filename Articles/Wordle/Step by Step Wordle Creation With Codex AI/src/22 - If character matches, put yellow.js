/* When clicking validate button, 
we need to check if the characters of the chosen row
are included in the secret word. 
If they are, the cell should be marked as yellow (#edc953) */

document.getElementById('validate').addEventListener('click', function(event) { 
  var cells = document.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
      if (secretWord.indexOf(cells[i].innerHTML) >= 0) {
        cells[i].style.backgroundColor = '#edc953';
      }
    }
  }
});