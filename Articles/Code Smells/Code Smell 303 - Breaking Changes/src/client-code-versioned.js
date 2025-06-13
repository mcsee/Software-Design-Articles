// user-api-v1.json - Version 1 (maintained)
{
  "id": 317,
  "name": "Mr Nimbus",
  "email": "nimbus@atlantis.com",
  "nationalities": "Brazilian,Canadian,Oceanic"
}

// user-api-v2.json - Version 2 
// (new structure, backward compatible)
{
  "id": 317,
  "userId": 317,
  "name": "Mr Nimbus",
  "fullName": "Mr Nimbus",
  "email": "nimbus@atlantis.com",
  "emailAddress": "nimbus@atlantis.com",
  "createdAt": "2018-12-09T18:30:00Z",
  "nationalities": "Brazilian,Canadian,Oceanic"
  "nationalitiesList": ["Brazilian", "Canadian", "Oceanic"]
}

// user-api-v3.json - Version 3 
// (new structure, backward not compatible)
{
  "userId": 317,
  "fullName": "Mr Nimbus",
  "emailAddress": "nimbus@atlantis.com",
  "createdAt": "2018-12-09T18:30:00Z",
  "nationalitiesList": ["Brazilian", "Canadian", "Oceanic"]
}

// client-code-versioned.js
const API_VERSION = 'v1';

fetch(`/api/${API_VERSION}/users/317`)
  .then(response => response.json())
  .then(user => {
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    // V1 handles comma-separated string
    document.getElementById('nationalities').textContent
      = user.nationalities;
  });

// Or with content negotiation
fetch('/api/users/317', {
  headers: {
    'Accept': 'application/vnd.api+json;version=1'
  }
})
  .then(response => response.json())
  .then(user => {
    document.getElementById('name').textContent = user.name;
    document.getElementById('email').textContent = user.email;
    document.getElementById('nationalities').textContent 
      = user.nationalities;
  });