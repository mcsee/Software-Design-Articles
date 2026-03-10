// opencode: "Create a failing text, fix the login bug, run tests, 
// Ensure it passes the new test and all the previous ones
// Create a Pull Request so I can review it

async function loginUser(email, password) {
  const url = 'https://api.penrosebrain.com/login';

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
  } catch (error) {
    console.error('There was an error:', error.message);
    alert(error.message);
  }
}

