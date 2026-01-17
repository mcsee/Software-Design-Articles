userIsValid() && logUserIn();

// this expression is short circuit
// Doesn't value second statement
// Unless the first one is true

functionDefinedOrNot && functionDefinedOrNot();

// in some languages undefined works as a false
// If functionDefinedOrNot is not defined doesn't
// raise an error and neither runs