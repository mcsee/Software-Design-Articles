import React from 'react';

// This is more closely related to real world
const NonExistentCustomer = () => {
  return (
    <div>
      <h2>Non Existent customer</h2>
      <p>Sorry, we couldn't find any customer matching your criteria.</p>
    </div>
  );
};

const App = () => { 
  const customerDataAvailable = false;

  return (
    <div>
      <h1>Customer Details</h1>
      {customerDataAvailable ? (
        <div>
          {/* Customer exists */}
          <h2>Customer Name: Newman</h2>
          <p>Email: newman@example.com</p>
          <p>Phone: 666-666-6666</p>
        </div>
      ) : (
        <NonExistentCustomer />
      )}
    </div>
  );
};

export default App;
