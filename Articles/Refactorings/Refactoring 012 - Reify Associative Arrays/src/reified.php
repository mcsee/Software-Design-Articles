<?

class AuthenticationCredentials {

  private $user;
  private $oauth2_token;
  
  function __construct(User $user) {
    $this->validateUser($user);
    // Specific validation rules
      
    $this->user = $user;
    // Cannot mutate 
  }

  function oauth2_token(string $token): void {
    // You can add specific validations
    $this->oauth2_token = $token;
  }

  function oauth2_token(): string {    
    // Return type hinting
    return $this->oauth2_token;
  }

}

// Usages

$credentials = new AuthenticationCredentials(new User('Elon'));
// Valid since creation
  
$credentials->oauth2_token([]);
// type errors are caught

$credentials->oauth2_token(null);
// cannot be null. Fail fast

$credentials->scope();
// Typo detected