/* when entering text in the box, convert it to uppercase */

input.addEventListener('keyup', function(event) { 
  event.target.value = event.target.value.toUpperCase();
});