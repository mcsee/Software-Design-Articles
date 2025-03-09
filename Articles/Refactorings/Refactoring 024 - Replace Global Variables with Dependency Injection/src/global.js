// This global variable holds the API configuration  
const globalConfig = { apiUrl: "https://api.severance.com" };  

function fetchOuties() {  
  return fetch(`${globalConfig.apiUrl}/outies`);  
  // globalConfig is NOT passed as parameter
}  