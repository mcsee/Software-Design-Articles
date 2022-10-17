// Step 14 bis
/* add an input text field under the table */

var status = document.createElement('input');
status.setAttribute('type','text');
status.setAttribute('placeholder','');
status.id = 'status';
status.readOnly = true;
document.body.appendChild(status);
status.style.margin = '10px';
status.style.width = '300px';