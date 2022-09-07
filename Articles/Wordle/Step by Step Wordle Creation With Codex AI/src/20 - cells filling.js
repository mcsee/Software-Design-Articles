/* after writing on the text field,
the value from every character will be writen
on each cell of the selected row */

input.addEventListener('keyup', function(event) {
  var text = event.target.value;
  var cells = document.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
      cells[i].innerHTML = text.charAt(i - rowIndex * 5);
    }
  }
});