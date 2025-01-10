<?

class AuthenticationHelper extends Singleton {

  private $data = [];

  function setParameter(string $key, ?$value) {
    // no type checking
    // value as the name is too generic
    // Since SOME parameters might be null
    // You cannot check a single parameter for not null

    $this->data[$key] = value;
  }

  function getParameter(string $key) {
    // no return type hinting
    return $this->data[$key] ?? null;
  }

}

// Usages

AuthenticationHelper::getInstance
  ->setParameter('oauth2_token', []);
// type error not caught

AuthenticationHelper::getInstance
  ->setParameter('scopes', null);
// We need to enforce this not to be NULL

AuthenticationHelper::getInstance
  ->setParameter('user', 'Elon');
// This should not mutate
// No validation with business rules

$credential =
  AuthenticationHelper::getInstance
    ->getParameter('oauth2token');
// Typo not detected

// You can not easily find
// references to methods setting the oauth2_token