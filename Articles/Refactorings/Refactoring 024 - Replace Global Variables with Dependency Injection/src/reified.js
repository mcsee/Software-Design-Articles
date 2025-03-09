class ApiService {
  constructor(parameterConfig) {
    this.variableConfig = parameterConfig;
  }
  
  // parameterConfig, variableConfig
  // and applicationConfig
  // are very bad names. 
  // They are here to emphasize the change

  fetchOuties() {
    return fetch(`${this.variableConfig.apiUrl}/outies`);
  }
}

const apiService = 
  new ApiService({ apiUrl: "https://api.severance.com" });
apiService.fetchOuties();