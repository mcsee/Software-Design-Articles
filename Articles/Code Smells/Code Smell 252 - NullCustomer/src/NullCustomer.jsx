import React from 'react';

const NullCustomer = () => {
  return (
    <div>
      <h2>No customer found</h2>
      <p>Sorry, we couldn't find any customer 
        matching your criteria.</p>
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
          {/* Render customer data */}
          <h2>Customer Name: Cosmo Kramer</h2>
          <p>Email: cosmo.kramer@example.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      ) : (
        <NullCustomer />
      )}
    </div>
  );
};

export default App;
