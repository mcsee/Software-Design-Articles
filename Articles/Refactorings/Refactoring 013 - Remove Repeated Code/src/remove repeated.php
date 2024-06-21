<?php

class AccessControlPanel {

  private $users = [];

  // 1.  Make a contextual copy of the repeated code
  
  private function createUser(
     $username, 
     $password,
     $email, 
     $role, 
     $loginPolicy) {
    $user = [
      "username" => $username,
      "email" => $email,
      "type" => $role,
      "creationDate" => $this->timeSource->currentTimestamp(),
      "needsToChangePassword" => $this->needsToChangePassword(),
      "loginPolicy" => $loginPolicy
    ];
    $this->users[] = $user;
    $this->addCreationToJournal($user);
    return $user;
  }
  
  // 2. Parametrize what is different (in this case $role and $loginPolicy)

  public function createRegularUser($username, $password, $email) {
    // 3. Invoke the abstraction
    return $this->createUser(
      $username,
      $password,
      $email, 
      $this->regularUserRole(),
      $this->userLoginPolicy());
  }

  public function createAdminUser($username, $password, $email) {
    return $this->createUser(
      $username,
      $password,
      $email,
      $this->adminUserRole(), 
      $this->adminUserLoginPolicy());
  }
  
  // 4. Find a real-world metaphor for the abstraction
  // private function createUser(
  // $username, 
  // $password,
  // $email, 
  // $role, 
  // $loginPolicy)
}

?>