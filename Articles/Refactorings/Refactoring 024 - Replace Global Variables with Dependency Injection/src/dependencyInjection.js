function fetchOuties(parameterConfig) {  
  return fetch(`${parameterConfig.apiUrl}/outies`);  
  // 1. Identify global variables
  // used across your codebase.
  // 4. Refactor the existing code 
  // to use the new dependency-injected structure. 
}  

const applicationConfig = { apiUrl: "https://api.severance.com" };  
// 2. Create a real-world abstraction
// to encapsulate these variables.

fetchOuties(applicationConfig); 
// 3. Pass dependencies explicitly 
// via function parameters or constructors.

//  const globalConfig = { apiUrl: "https://api.severance.com" };  
// 5. Remove the original 
// global variable declarations.

// Why Is 'config' a Dependency?
// Because:
// outies() depends on knowing the API URL to work
// Without this information, 
// The function can't perform its core task
// The dependency is 
// explicitly declared in the function signature