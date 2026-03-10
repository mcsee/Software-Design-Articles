// Please fix the login bug in this snippet:

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