/* add another button with id 'remove' and the 'x' character as label */

var button = document.createElement('button');
button.innerHTML = '&#10007;';
button.id = 'remove';
document.body.appendChild(button);