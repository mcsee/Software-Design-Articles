document.getElementById('passwordForm')
  .addEventListener('submit', function(event) {
  event.preventDefault(); 
  // Prevent the form from submitting
  const password = document.getElementById('password').value; 
  // Get the password value
  const errorMessages = document.getElementById('errorMessages'); 
  // Get the error messages container
  errorMessages.innerHTML = ''; // Clear previous error messages

  let errors = []; // Array to store error messages

  // Validate minimum length
  if (password.length < 8) {
    errors.push('The password must be at least 8 characters long.');
  }

  // Validate uppercase letters
    if (!/[A-Z]/.test(password)) {
      errors.push('The password must contain one uppercase letter.');
    }

    // Validate lowercase letters
    if (!/[a-z]/.test(password)) {
      errors.push('The password must contain one lowercase letter.');
    }

    // Validate numbers
    if (!/[0-9]/.test(password)) {
      errors.push('The password must contain one number.');
    }

    // Validate special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('The password must contain one special character.');
    }

    // Display errors or success message
    if (errors.length > 0) {
      errors.forEach(error => {
          const p = document.createElement('p'); 
          // Create a new paragraph element
          p.textContent = error; 
          // Set the error message as text
          errorMessages.appendChild(p);
          // Add the error message to the container
      });
    } else {
        alert('Valid password!'); 
        // Show success message if no errors
    }
});