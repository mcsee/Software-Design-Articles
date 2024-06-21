<?php

class AccessControlPanel {

  private $users = [];

  public function createRegularUser($username, $password, $email) {
    $user = [
      "username" => $username,
      "email" => $email,
      "type" => $this->regularUserRole(),
      "creationDate" => $this->timeSource->currentTimestamp(),
      "needsToChangePassword" => $this->needsToChangePassword(),
      "loginPolicy" => $this->userLoginPolicy()
    ]
    $this->users[] = $user;
    $this->addCreationToJournal($user);
  }
  
   public function createAdminUser($username, $password, $email) {
    $user = [
      "username" => $username,
      "email" => $email,
      "type" => $this->regularUserRole(),
      "creationDate" => $this->timeSource->currentTimestamp(),
      "needsToChangePassword" => $this->needsToChangePassword(),
      "loginPolicy" => $this->adminUserLoginPolicy()
    ]
    $this->users[] = $user;
    $this->addCreationToJournal($user);
    return $user;
  }
} 

?>