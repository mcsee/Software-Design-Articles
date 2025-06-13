// user-api-v1.json - Original API response
{
  "id": 317,
  "name": "Mr Nimbus",
  "email": "nimbus@atlantis.com",
  "nationalities": "Brazilian,Canadian,Oceanic"
}

// Later changed to this without versioning:
{
  "userId": 317,
  "fullName": "Mr Nimbus", 
  "emailAddress": "nimbus@atlantis.com",
  "createdAt": "2018-12-09T18:30:00Z",
  "nationalities": ["Brazilian", "Canadian", "Oceanic"]
}

fetch('/api/users/317')
  .then(response => response.json())
  .then(user => {
    // This breaks when API changes field names and data types
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    // This breaks when nationalities changes from string to array
    document.getElementById('nationalities').textContent 
      = user.nationalities;
  });