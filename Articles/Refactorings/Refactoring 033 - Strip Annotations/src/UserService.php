<?php
class UserService {
    // Step 1: Identified annotations 
    //   (@author, @version, @description, 
    // Step 2: Evaluated their purpose 
    //   (metadata, deprecated, todo notes)
    // Step 3: Removed unnecessary annotations (no value added)
    // Step 4: Replaced critical annotations 
    //   with explicit code (none needed)
  
    // Type hintings are explicit
    public function userName(int $id): string {        
        $statement = $this->database->prepare(
          "SELECT name FROM users WHERE id = ?");
        // No tech debt 
        $statement->execute([$id]);
        return $statement->fetchColumn();
        // You can add a test to ensure there are 
        // no new calls to this deprecated method
    }
}