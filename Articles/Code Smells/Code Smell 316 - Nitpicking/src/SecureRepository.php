<?php

final class UserRepository {
    private Database $database;

    public function __construct(Database $database) {
        $this->database = $database;
    }

    public function find(UserId $id): User {
        return $this->database->fetchUser($id);
    }
}

// You removed credentials, SQL, and infrastructure noise.
// Now reviewers can discuss design and behavior.