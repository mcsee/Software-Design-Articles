/*add a button by the field with the 'tick' character. The Button must have un id named 'validate' */

var button = document.createElement('button');
button.innerHTML = '&#10003;';
button.id = 'validate';
document.body.appendChild(button);