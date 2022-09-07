// Step 23

// if character is in right position, cell should be in green (#aedb95)

document.getElementById('validate').addEventListener('click', function(event) {
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
      if (secretWord.charAt(i - rowIndex * 5) === cells[i].innerHTML) {
        cells[i].style.backgroundColor = '#aedb95';
      }
    }
  }
});